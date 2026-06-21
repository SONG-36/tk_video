"""Codex 输出读取命令的安全占位入口。

未来接口接收商品系列、目标型号、批次、已确认批次计划位置和输出格式。
未来读取顺序为：确认三类 ID 与批次根，取得 video_id 白名单，再在批次根
边界内形成只读结果。当前脚本不实现路径校验、计划读取、目录遍历、文件索引、
缺失判断、内容解析或业务校验；不读取设计、Schema、data 或 outputs；不写文件，
也不调用 Codex、API、OCR、VLM 或任何视频模型。
"""

import argparse


def build_parser() -> argparse.ArgumentParser:
    """定义未来命令接口；所有参数当前均不触发读取或处理。"""
    parser = argparse.ArgumentParser(
        description="Output reader placeholder; no files are read, traversed, or written."
    )
    parser.add_argument("--product-series-id", help="Future product_series_id input.")
    parser.add_argument("--variant-id", help="Future target variant_id ownership input.")
    parser.add_argument("--batch-id", help="Future batch_id input.")
    parser.add_argument(
        "--video-batch-plan",
        help="Future confirmed video_batch_plan location; currently ignored.",
    )
    parser.add_argument(
        "--output-format",
        help="Future response representation parameter; currently ignored.",
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
    print("read-outputs: not implemented; no files were read, traversed, or written")


if __name__ == "__main__":
    main()
