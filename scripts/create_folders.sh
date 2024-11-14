#!/bin/bash

# 创建文件夹的父目录
parent_dir="/Users/gaobaoqi/Documents/zxq/uft/unifiedfieldtheory.cn/src/assets/main-works/unified-field-theory"

# # 创建父目录（如果不存在）
# mkdir -p "$parent_dir"

# 循环创建 section-0 到 section-40 的文件夹
for i in {0..40}; do
    mkdir -p "$parent_dir/section-$i"
done

echo "文件夹创建完成！"