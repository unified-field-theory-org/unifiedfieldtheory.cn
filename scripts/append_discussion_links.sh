#!/bin/bash

cd /Users/gaobaoqi/Documents/zxq/uft/unifiedfieldtheory.cn/src/content/docs/zh-cn/main-works/unified-field-theory

for i in {1..23}; do
  file="section-${i}.mdx"
  href_num=$((10010000000000128 + i))
  
  echo -e "\n<br />\n<LinkCard\n  title=\"前往本章节讨论区\"\n  href=\"https://forum.unifiedfieldtheory.cn/questions/${href_num}\"\n  description=\"看看大家阅读完本章之后都在讨论什么，并发表你自己的看法~\"\n  target=\"_blank\"\n/>" >> "$file"
done