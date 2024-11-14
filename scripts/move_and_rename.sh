#!/bin/bash

# 源目录
src_dir="/Users/gaobaoqi/Documents/zxq/uft/unifiedfieldtheory.cn/src/assets/unified-field-theory/chapter-1"
# 目标目录
dst_dir="/Users/gaobaoqi/Documents/zxq/uft/unifiedfieldtheory.cn/src/assets/main-works/unified-field-theory"

# section-x-y.png
# 循环遍历 x 和 y 的值
for x in {0..40}; do  # 假设 x 的范围是 0 到 40，根据需要修改
    for y in {1..10}; do  # 假设 y 的范围是 1 到 10，根据需要修改
        # 源文件路径
        src_file="$src_dir/section-$x-$y.png"
        
        # 检查源文件是否存在
        if [[ -f "$src_file" ]]; then
            # 目标文件夹
            target_dir="$dst_dir/section-$x"
            # 创建目标文件夹（如果不存在）
            mkdir -p "$target_dir"
            # 目标文件路径
            dst_file="$target_dir/$y.png"
            # 移动并重命名文件
            mv "$src_file" "$dst_file"
            echo "移动 $src_file 到 $dst_file"
        # else
        #     echo "文件 $src_file 不存在"
        fi
    done
done