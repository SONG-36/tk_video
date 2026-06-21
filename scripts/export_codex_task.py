"""Codex 任务包导出命令的安全占位入口。

未来接口用于接收商品系列、目标型号、批次和输出格式参数，并以
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.* 为预期输出。
当前脚本不读取设计、Schema、data 或 outputs，不校验业务、不渲染模板、
不创建目录、不写文件，也不调用 Codex、API 或任何视频模型。
"""

import argparse


def build_parser() -> argparse.ArgumentParser:
    """定义未来命令接口；所有参数当前均不触发处理。"""
    parser = argparse.ArgumentParser(
        description="Codex task package exporter placeholder; no files are read or written."
    )
    parser.add_argument("--product-series-id", help="Future product_series_id input.")
    parser.add_argument("--variant-id", help="Future target variant_id input.")
    parser.add_argument("--batch-id", help="Future batch_id input.")
    parser.add_argument(
        "--output-format",
        choices=("markdown", "json", "both"),
        help="Future task package representation; currently ignored.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Reserved interface flag; the placeholder always has no file side effects.",
    )
    return parser


def main() -> None:
    """解析占位参数并输出未实现提示，不执行任何文件操作。"""
    build_parser().parse_args()
    print("export-codex-task: not implemented; no files were read or written")


if __name__ == "__main__":
    main()
