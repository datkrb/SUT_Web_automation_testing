import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./', import.meta.url));
const clean = value => String(value ?? '')
  .replace(/\u001b\[[0-9;]*m/g, '')
  .replaceAll(root, './')
  .replaceAll(root.replaceAll('\\', '/'), './');
const cell = value => clean(value).replaceAll('|', '\\|').replace(/\r?\n/g, '<br>');
const seconds = milliseconds => (milliseconds / 1000).toFixed(2);
const statusName = status => ({
  passed: 'PASS', failed: 'FAIL', timedOut: 'TIMEOUT', skipped: 'SKIP',
  interrupted: 'INTERRUPTED', notRun: 'NOT RUN',
}[status] || status);

function errorBlock(error) {
  const message = clean(error.message || error.stack || String(error));
  const fence = '`'.repeat(Math.max(3, ...[...message.matchAll(/`+/g)].map(match => match[0].length + 1)));
  return `${fence}text\n${message}\n${fence}`;
}

export default class MarkdownReporter {
  constructor() {
    this.tests = [];
    this.errors = [];
  }

  onBegin(config, suite) {
    this.config = config;
    this.tests = suite.allTests();
  }

  onError(error) {
    this.errors.push(error);
  }

  async onEnd(run) {
    const output = path.join(root, 'test-results/REPORT.md');
    const rows = this.tests.map(test => ({
      test,
      result: test.results.at(-1),
      status: test.results.at(-1)?.status || 'notRun',
      group: test.parent.title,
      duration: test.results.reduce((total, result) => total + result.duration, 0),
    }));
    const counts = {};
    for (const row of rows) counts[row.status] = (counts[row.status] || 0) + 1;
    const start = run.startTime.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' });
    const browser = this.config?.projects.map(project => project.use.channel || project.use.browserName || 'chromium').join(', ') || 'unknown';
    const lines = [
      '# Kết quả chạy test EShop',
      '',
      `- Bắt đầu: ${start} (UTC+07:00).`,
      `- Thời gian: ${seconds(run.duration)} giây.`,
      `- Trạng thái runner: **${run.status}**.`,
      `- Trình duyệt cấu hình: ${cell(browser)}.`,
      '- SUT: [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut).',
      '- Nguồn kết quả: callback thực tế của Playwright trong lần chạy này.',
      '',
      '## Tổng hợp',
      '',
      '| Số ca được chọn | Pass | Fail | Timeout | Skip | Interrupted | Chưa chạy | Số lần thực thi |',
      '|---:|---:|---:|---:|---:|---:|---:|---:|',
      `| ${rows.length} | ${counts.passed || 0} | ${counts.failed || 0} | ${counts.timedOut || 0} | ${counts.skipped || 0} | ${counts.interrupted || 0} | ${counts.notRun || 0} | ${rows.reduce((total, row) => total + row.test.results.length, 0)} |`,
      '',
      '| Chức năng | Ca | Pass | Fail/Timeout | Skip/Interrupted/Chưa chạy |',
      '|---|---:|---:|---:|---:|',
    ];
    for (const group of new Set(rows.map(row => row.group))) {
      const selected = rows.filter(row => row.group === group);
      lines.push(`| ${cell(group)} | ${selected.length} | ${selected.filter(row => row.status === 'passed').length} | ${selected.filter(row => ['failed', 'timedOut'].includes(row.status)).length} | ${selected.filter(row => !['passed', 'failed', 'timedOut'].includes(row.status)).length} |`);
    }
    lines.push('', '## Từng test case', '', '| # | Chức năng | Test case | Kết quả | Giây | Vị trí source |', '|---:|---|---|---|---:|---|');
    for (const [index, row] of rows.entries()) {
      const location = `${path.relative(root, row.test.location.file).replaceAll('\\', '/')}:${row.test.location.line}`;
      lines.push(`| ${index + 1} | ${cell(row.group)} | ${cell(row.test.title)} | ${statusName(row.status)} | ${seconds(row.duration)} | ${cell(location)} |`);
    }
    const failures = rows.filter(row => ['failed', 'timedOut', 'interrupted'].includes(row.status));
    if (failures.length) {
      lines.push('', '## Chi tiết lỗi');
      for (const row of failures) {
        lines.push('', `### ${cell(row.test.title)}`, '', `Nhóm: ${cell(row.group)}. Trạng thái: **${statusName(row.status)}**.`, '');
        for (const error of row.result?.errors || []) lines.push(errorBlock(error), '');
        for (const attachment of row.result?.attachments || []) {
          if (!attachment.path) continue;
          const relative = path.relative(path.dirname(output), attachment.path).replaceAll('\\', '/');
          lines.push(`- [${cell(attachment.name)}](<${relative}>)`);
        }
      }
    }
    if (this.errors.length) {
      lines.push('', '## Lỗi runner/môi trường', '');
      for (const error of this.errors) lines.push(errorBlock(error), '');
    }
    lines.push('', '## Giới hạn kết quả', '',
      'Report chỉ phản ánh các ca được chọn trong lần chạy này, không gộp lịch sử. Một ca fail không chứng minh tất cả checkpoints của ca đều đã được chạy. Đọc assertion và trace để phân biệt lỗi SUT với lỗi test hoặc môi trường; reporter không tự kết luận nguyên nhân.',
      '', 'Report được ghi lại sau mỗi lần chạy, kể cả khi có test fail. JSON: [results.json](results.json). HTML: [playwright-report](../playwright-report/index.html).', '');
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, lines.join('\n'), 'utf8');
  }
}
