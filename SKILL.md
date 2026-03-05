---
name: hitpaw-image-enhancer
description: Enhance images and videos using HitPaw's AI enhancement API
<<<<<<< HEAD
version: "1.0.0"
=======
version: 1.0.0
>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)
author: Nova (HitPaw-Official)
type: cli
entry: dist/cli.js
repository: https://github.com/HitPaw-Official/openclaw-skill-hitpaw-enhancer
keywords:
  - image
  - video
  - enhancement
  - upscale
  - hitpaw
  - ai
license: MIT
capabilities:
  - image_enhancement
  - image_upscaling
  - photo_enhance
  - video_enhancement
  - video_upscaling
requirements:
  node: ">=18"
  packages:
    - axios
    - commander
    - ora
    - chalk
    - fs-extra
environment:
  variables:
    - name: HITPAW_API_KEY
      description: Your HitPaw API key
      required: true
<<<<<<< HEAD
---

# HitPaw Image & Video Enhancer Skill

A powerful OpenClaw skill that integrates HitPaw's state-of-the-art AI enhancement technology for both **images** and **videos**. Enhance, upscale, restore, and denoise with multiple AI models.
=======
---

# HitPaw Image & Video Enhancer Skill

**基于 HitPaw 前沿 AI 技术的图像与视频增强工具**

A powerful OpenClaw skill that integrates HitPaw's state-of-the-art AI enhancement technology for both **images** and **videos**. Enhance, upscale, restore, and denoise with multiple AI models.

---

## 🎯 功能总览

### 图像处理核心能力
>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)

- 🔄 **智能放大**：2x 或 4x 超分辨率放大，无质量损失
- 👤 **人脸增强**：专为人像优化的专业模型，支持柔美/自然两种风格
- 🌟 **细节还原**：去噪、去模糊，恢复丢失的细节
- 🎨 **生成式修复**：使用 Diffusion 技术重建严重损坏的肖像或通用图像
- 📊 **实时进度追踪**：轮询机制，随时查看处理状态
- ⚙️ **高保真输出**：支持 DPI 配置、EXIF 保留

<<<<<<< HEAD
### Image Enhancement
- 🚀 **Upscale images 2x or 4x** without quality loss
- 👤 **Face enhancement** with specialized models
- 🌟 **Multiple models**: General, Face, High Fidelity, Denoise, Generative
- 📊 **Real-time progress tracking** with polling
- ⚙️ **Configurable DPI** and EXIF preservation

### Video Enhancement
- 🎬 **Upscale videos** to higher resolutions
- 🤖 **Multiple AI models** for different use cases
- 🎵 **Audio preservation** option
- ⏱️ **Long-running job support** with extended polling
- 📥 **Automatic download** when complete

## Installation
=======
### 视频处理核心能力

- 🎬 **超高清转换**：将标清/高清素材转换为 4K 画质
- 👥 **人像视频修复**：专门检测和增强视频中的人脸，保持时序一致性
- 🧹 **通用视频修复**：基于 GAN 的综合去噪、去模糊、细节增强
- 🔮 **生成式视频重建**：Stable Diffusion 技术处理极端低质量素材
- ⏱️ **长任务支持**：自动处理长时间视频，支持超时扩展
- 🎵 **音频保留**：可选保留原始音轨
- 📥 **自动下载**：完成后自动获取结果文件

---

## 🚀 为什么选择 HitPaw API?

根据 [官方文档](https://developer.hitpaw.com/image/Introduction)，HitPaw 的图像/视频处理服务具有以下核心优势：

### 图像 API 优势
- **质量行业领先**：专业级的输出质量，适用于商业摄影和档案修复等高要求场景
- **高保真度**：严格保留原始图像的细节和主体特征，确保输出真实反映输入
- **高效响应**：针对低延迟和高吞吐量优化，可规模化处理不同的增强任务

### 模型分类
- **标准模型**：快速高效，最大程度保持原图保真度和细节，适用于大多数专业和日常修复
- **生成式模型**：基于 Stable Diffusion，能够"想象"缺失细节，适合传统放大无法处理的极端低质量输入

### 视频 API 优势
- **时序稳定性**：不同于纯图像模型，视频引擎确保帧间过渡平滑，消除闪烁和抖动
- **细节清晰度**：恢复精细细节，去除流媒体或老旧媒体常见的压缩伪影
- **性能优化**：针对繁重视频处理工作负载优化推理时间

---

## 📸 图像增强详细模型指南

根据 [Available Models 文档](https://developer.hitpaw.com/image/available-models)，所有模型分为 **标准模型** 和 **生成式模型** 两类：

### Standard Models（标准模型）
这些模型速度极快，专注于精确保持原图细节和特征，推荐用于大部分专业和日常修复场景。

#### 1. General Enhanced Model（通用增强）
- **对应模型**：`general_2x` / `general_4x`
- **功能**：2x/4x 超分辨率放大，同时优化整体图像质量
- **技术特点**：基于专用超分辨率架构，优先恢复清晰度和生成锐利纹理
- **最佳场景**：低分辨率通用图像，有效处理模糊或缺失细节，重新生成锐利边缘和纹理
- **示例应用**：
  - 网络图片放大
  - 老旧扫描件增强
  - 低分辨率照片提升

#### 2. Portrait Model (Clear)（人像-柔美）
- **对应模型**：`face_2x` / `face_4x`
- **功能**：2x/4x 超分辨率，人脸+背景双模型管道
- **技术特点**：人脸增强 + 背景超分。面部采用柔和风格，背景保持锐利细节
- **最佳场景**：低质量肖像照片。平衡美颜（柔化皮肤）与清晰度（锐化背景）
- **示例应用**：
  - 自拍照片优化
  - 证件照美化
  - 网络人像修复

#### 3. Portrait Model (Natural)（人像-自然）
- **对应模型**：`face_v2_2x` / `face_v2_4x`
- **功能**：改进版 V2 模型，提升低质量人像，保留真实皮肤纹理
- **技术特点**：高保真纹理恢复。还原皮肤的原始颗粒和毛孔，避免过度美颜
- **最佳场景**：追求真实感的场景，如专业摄影修复、保留人物特征的修复
- **示例应用**：
  - 艺术摄影后期
  - 历史照片人像复原
  - 需要保持人物特征的项目

#### 4. High Fidelity Model（高保真）
- **对应模型**：high_fidelity_2x` / `high_fidelity_4x`
- **功能**：专为高质量输入设计的超分模型，放大时严格保留原细节
- **技术特点**：保守增强算法，避免过度处理，保留精细纹理
- **最佳场景**：专业摄影或高质量源需要大幅放大（如印刷、4K显示）
- **示例应用**：
  - 商业摄影放大
  - 高分辨率素材生成大幅面
  - 艺术作品放大输出

#### 5. Sharp Denoise Model（锐化去噪）
- **对应模型**：sharpen_denoise_1x`
- **功能**：1x（不改变分辨率）去噪+锐化
- **技术特点**：激进去除视觉噪声和颗粒，同时锐化边缘和纹理
- **最佳场景**：低光噪点照片、数字噪声严重的图像
- **示例应用**：
  - 高ISO照片降噪
  - 老照片颗粒去除
  - 屏幕截图优化

#### 6. Detail Denoise Model（细节去噪）
- **对应模型**：detail_denoise_1x`
- **功能**：1x 去噪，严格遵循原图纹理和细节
- **技术特点**：强调保真度和自然恢复。去噪但避免过度锐化，保持原始"感觉"
- **最佳场景**：艺术照片、扫描文档等需要保留细微纹理的场景
- **示例应用**：
  - 艺术摄影处理
  - 扫描文档优化
  - 保留纹理的复古风格

### Generative Models（生成式模型）
这些模型使用 Stable Diffusion 技术，能够"创造"缺失的细节，适合传统放大器无法处理的极端低质量输入。

#### 7. Generative Portrait（生成式人像）
- **对应模型**：`generative_portrait_1x` / `generative_portrait_2x` / `generative_portrait_4x`
- **功能**：基于 Diffusion 的超分辨率接口，专为人像设计，支持 1x-4x 可变放大
- **技术特点**：利用 Diffusion 技术幻觉和重建真实细节。优先自然皮肤纹理和面部特征，显著提升清晰度同时保持自然外观
- **最佳场景**：**极其低质量的人像**，当传统放大失败时。它"重新想象"细节，从模糊输入创建高质量肖像
- **示例应用**：
  - 极度模糊的老照片人像
  - 低分辨率证件照重建
  - 被严重压缩的社交媒体图片

#### 8. Generative Enhance（生成式通用）
- **对应模型**：`generative_enhance_1x` / `generative_enhance_2x` / `generative_enhance_4x`
- **功能**：通用 Diffusion 超分接口，支持 1x-4x 可变放大，适配各种内容类型
- **技术特点**：专注于纹理生成和锐化。 excels at 重建非人类对象的精细细节和纹理，产生高度锐利详细的输出
- **最佳场景**：**重度压缩或极低分辨率通用图像**，需要大量重建才能在高分辨率下看起来可接受
- **示例应用**：
  - 极度压缩的网络图片
  - 低分辨率截图放大
  - 马赛克图像还原尝试

---

## 🎬 视频增强详细模型指南

根据 [Video Models 文档](https://developer.hitpaw.com/video/available-models)，视频模型同样分为 **标准模型**（Restoration & Upscale）和 **生成式模型**（Generative Video）两类。视频处理的关键优势是 **时序稳定性**，确保帧间过渡平滑无闪烁。

### Standard Models（标准视频模型）

专注于清理素材和提升分辨率，不改变基本内容，基于像素级精确性和时序一致性。

#### 1. Ultra HD Model（超高清）
- **对应模型**：`ultrahd_restore_2x`
- **功能**：超分接口，专为高清输出设计，增强清晰度，恢复自然细腻纹理
- **技术特点**：基于深度卷积和特征学习。挖掘基础图像数据的精细纹理，提高分辨率和整体清晰度。专门调优处理中频纹理，确保线条平滑（抗锯齿）无锯齿，呈现干净专业的放大效果
- **最佳场景**：将 1080p 内容放大到 4K，确保结果视频看起来自然，无基本放大器的"数字"感
- **典型用例**：
  - 高清老片重制
  - 网络视频提升
  - 家庭录像数码化增强

#### 2. General Restore Model（通用修复）
- **对应模型**：`general_restore_1x` / `general_restore_2x` / `general_restore_4x`
- **功能**：基于 GAN 的综合修复接口，实现去噪、去模糊、细节增强
- **技术特点**：使用自适应端到端生成对抗网络（GAN）。设计用于处理复杂输入，去除压缩伪影、提升清晰度、重建精细细节。在高频细节再生和平滑之间取得平衡，避免过度锐化或鬼影
- **最佳场景**：通用视频内容改善，如重制老片段、修复压缩的互联网视频、提升低质量相机素材
- **典型用例**：
  - 老电影修复
  - TikTok/短视频画质提升
  - 监控录像增强

#### 3. Video Portrait Restoration（视频人像修复）
- **对应模型**：`portrait_restore_1x` / `portrait_restore_2x`
- **功能**：专为修复多人视频设计。修复模糊和噪声，提升面部清晰度，确保时序稳定性
- **技术特点**：使用多帧融合和深度学习对齐时空特征。针对连续帧提取有效细节，有效去除运动模糊和噪声。增强面部特征（眼、鼻、嘴）清晰度，同时确保帧间平滑过渡防止闪烁/抖动
- **最佳场景**：修复移动主体的视频，如老旧家庭电影或低光素材，面部模糊或噪声大
- **典型用例**：
  - 采访视频修复
  - Vlog 画质提升
  - 运动视频人脸增强

#### 4. Video Face Soft Model（视频人脸柔化）
- **对应模型**：`face_soft_2x`
- **功能**：人脸柔化和风格化增强的专门视频接口
- **技术特点**：核心是人脸先验知识 + 空间特征对齐。高效去除退化（噪声、模糊、压缩伪影）无需复杂迭代步骤。使用关键点检测确保身份一致性，同时应用柔和的优化损失函数到皮肤纹理
- **最佳场景**：视频后期需要美颜的场景，如 Vlog、采访、直播回放
- **典型用例**：
  - 美颜视频处理
  - 直播录像优化
  - 短视频人脸美化

### Generative Video（生成式视频）

基于先进的 Stable Diffusion (SD) 技术，设计用于"不可能"的修复任务，当源视频数据严重不足时生成真实纹理和细节。

#### 5. Generative Video Model（生成式视频）
- **对应模型**：`generative_1x`
- **功能**：基于 Stable Diffusion 的前沿视频生成与修复接口
- **技术特点**：
  - **卓越时序一致性**：多帧 SD 架构 + 跨帧时序建模（Temporal Attention + Memory Mechanisms）。显著消除闪烁和"像素漂移"，确保视频细节在整个时间维度上稳定一致
  - **增强多帧重建**：跨多帧融合信息，识别和完成单帧分析无法恢复的缺失细节。实现更高质量、更可信的纹理重建和真实表面渲染
  - **复杂退化鲁棒性**：多帧建模方法对严重信息丢失具有异常抵抗性。有效缓解重度压缩、高ISO传感器噪声、复杂运动模糊造成的伪影，弥合修复与电影创作之间的差距
  - **基于逻辑的合成**：超越简单锐化，理解内容的视觉逻辑，以高度忠实于原始场景意图的方式重建纹理
- **最佳场景**：**极端低质量视频的修复**。适合 remastering 重度压缩的旧媒体、修复高速运动模糊、挽救几乎无原始细节的素材，创造现代高清观看体验
- **典型用例**：
  - 严重损坏老录像带
  - webm/mp4 超压缩文件修复
  - 高ISO噪点视频重建
  - 艺术化视频重新渲染

---

## 💰 计费说明

### 图像增强（基于 Playground 当前费率）
| 模型类型 | 单张费用 |
|---------|---------|
| 2x/4x 标准模型 | ~75 金币 |
| 1x 标准模型（去噪） | ~50 金币 |
| 生成式模型（Generative） | ~100+ 金币 |

### 视频增强（基于时长、模型和分辨率）
| 模型类型 | 每分钟左右费用 |
|---------|---------------|
| 放大模型（Upscale） | ~200-400 金币 |
| 修复模型（Restoration） | ~150-300 金币 |

**⚠️ 注意**：费率可能随 HitPaw 政策调整，实际费用请以 [Playground](https://playground.hitpaw.com/) 实时显示为准。

---

## 🛠️ 技术实现细节

### API 端点
```
Base URL: https://api-base.hitpaw.com

图像：
  POST /api/photo-enhancer    # 提交增强任务
  POST /api/task-status       # 查询状态

视频：
  POST /api/video-enhancer    # 提交增强任务
  POST /api/task-status       # 查询状态
```

### 认证方式
所有请求必须在 Header 中包含你的 API Key：
```
Apikey: your_api_key_here
```

### 任务流程
1. 提交增强请求，获取 `job_id` 和 `consume_coins`
2. 定期轮询 `POST /api/task-status` 传入 `job_id`
3. 状态返回：
   - `CONVERTING`：处理中，继续等待
   - `COMPLETED`：完成，从 `res_url` 下载结果
   - `ERROR`：失败，检查原因
4. 下载结果文件到本地

### 轮询策略
- **图像**：默认每 5 秒检查一次，总超时 300 秒（5 分钟）
- **视频**：默认每 10 秒检查一次，总超时 600 秒（10 分钟）
- 长时间视频请使用 `--timeout` 扩展（如 3600 秒处理 1 小时视频）

### 分辨率限制
- 视频目标分辨率**必填**，格式 `WIDTHxHEIGHT`（如 `1920x1080`）
- **最大输出**：36 百万像素（width × height ≤ 36,000,000）
  - ✅ 3840×2160 = 8.3 MP
  - ✅ 7680×4320 = 33.2 MP
  - ❌ 8192×4608 = 37.7 MP（超限）
- 视频时长限制：1 小时

---

## ⚠️ 常见错误与解决方案

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `Invalid API key` | API Key 错误或已过期 | 更新环境变量 `HITPAW_API_KEY` |
| `Insufficient coins` | 余额不足 | 在 Playground 充值金币 |
| `Unsupported model` | 模型名拼写错误或未发布 | 查阅上方模型表确认名称 |
| `Invalid extension` | 输出格式不支持 | 图像用 `.jpg/.png/.webp`；视频用 `.mp4/.mov/.avi` |
| `Invalid video URL` | URL 不可公开访问 | 确保视频通过 HTTPS 可访问 |
| `Input/target resolution over limit` | 超过 36 MP 总像素限制 | 降低分辨率 |
| `Video duration over limit` | 视频超过 1 小时 | 先剪辑分段处理 |
| `Rate limit exceeded` | 请求过于频繁 | 使用指数退避策略等待重试 |
| `Video processing failed` | 视频损坏或编码不支持 | 尝试重新编码为常见格式（如 H.264 MP4） |

---

## 📚 使用示例

### 图像处理
>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)

```bash
# 基础 2x 放大
enhance-image -u https://example.com/photo.jpg -o enhanced.jpg -m general_2x

# 人像 4x + 保留 EXIF + 自定义 DPI
enhance-image -u portrait.jpg -m face_4x -o portrait_4x.jpg --keep-exif --dpi 300

# 批量处理（脚本）
for img in *.jpg; do
  enhance-image -u "$img" -o "upscaled/$img" -m general_4x
done
```

### 视频处理

```bash
# 提升到 1080p
enhance-video -u input.mp4 -o output_1080p.mp4 -m general_restore_2x -r 1920x1080

# 放大到 4K，同时指定原始分辨率以提升质量
enhance-video -u clip.mov -o 4k.mov -m general_restore_4x -r 3840x2160 --original-resolution 1920x1080

# 人像修复，保留音频，设置 1 小时超时
enhance-video -u portrait_video.avi -m portrait_restore_2x -r 1920x1080 -o clean_portrait.mp4 --timeout 3600

# 生成式修复（极端低质量视频）
enhance-video -u severely_compressed.webm -m generative_1x -r 1920x1080 -o remastered.mp4

# 去噪处理，不放大
enhance-video -u noisy_video.mp4 -m general_restore_1x -r 1920x1080 -o denoised.mp4
```

---

## 🔗 相关资源

<<<<<<< HEAD
Get your API key at: https://playground.hitpaw.com/

---

# IMAGE COMMAND

## Usage: `enhance-image`

=======
- **图像 API 参考文档**: https://developer.hitpaw.com/image/API-reference
- **视频 API 参考文档**: https://developer.hitpaw.com/video/API-reference
- **Playground 在线测试**: https://playground.hitpaw.com/
- **API Key 购买**: https://www.hitpaw.com/hitpaw-api.html
- **技术支持**: support@hitpaw.com

**⚠️ 免责声明**：本 Skill 是非官方集成，需要有效 API Key 并遵守 HitPaw 服务条款。Skill 作者不承担任何使用产生的费用责任。

---

# IMAGE COMMAND

## Usage: `enhance-image`

>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)
### Command Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url`, `-u` | string | **required** | URL of the image to enhance |
| `--output`, `-o` | string | `output.jpg` | Output file path |
| `--model`, `-m` | string | `general_2x` | Image model (see below) |
| `--extension`, `-e` | string | `.jpg` | Output extension (`.jpg`, `.png`, `.webp`) |
| `--dpi` | number | original | Target DPI for metadata |
| `--keep-exif` | boolean | false | Preserve EXIF data from original |
| `--poll-interval` | number | 5 | Polling interval in seconds |
| `--timeout` | number | 300 | Maximum wait time in seconds |

#### Available Image Models

<<<<<<< HEAD
| Model | Multiplier | Best For | DPI Support |
|-------|------------|----------|-------------|
| `general_2x` / `general_4x` | 2x / 4x | General photos, landscapes | ✅ |
| `face_2x` / `face_4x` | 2x / 4x | Portrait & face enhancement | ✅ |
| `face_v2_2x` / `face_v2_4x` | 2x / 4x | Improved face model | ✅ |
| `high_fidelity_2x` / `high_fidelity_4x` | 2x / 4x | High quality preservation | ✅ |
| `sharpen_denoise_1x` | 1x | Denoise & sharpen | ✅ |
| `detail_denoise_1x` | 1x | Detail preservation | ✅ |
| `generative_*` (1x/2x/4x) | — | AI generative fill | ❌ |

=======
| Category | Model | Multiplier | Best For | DPI Support | Model Type |
|----------|-------|------------|----------|-------------|------------|
| **Standard** | `general_2x` / `general_4x` | 2x / 4x | General photos, landscapes | ✅ | High-quality super-resolution |
| **Standard** | `face_2x` / `face_4x` | 2x / 4x | Portrait beautification (soft skin) | ✅ | Dual pipeline: Face + Background |
| **Standard** | `face_v2_2x` / `face_v2_4x` | 2x / 4x | Portrait realism (natural texture) | ✅ | High-fidelity texture recovery |
| **Standard** | `high_fidelity_2x` / `high_fidelity_4x` | 2x / 4x | High-quality source upscaling | ✅ | Conservative enhancement |
| **Standard** | `sharpen_denoise_1x` | 1x | Aggressive denoise + sharpen | ✅ | Noise removal + edge sharpening |
| **Standard** | `detail_denoise_1x` | 1x | Detail-preserving denoise | ✅ | Fidelity-focused restoration |
| **Generative** | `generative_portrait_1x` / `2x` / `4x` | Variable | Extremely low-quality portraits | ❌ | Diffusion-based detail hallucination |
| **Generative** | `generative_enhance_1x` / `2x` / `4x` | Variable | Heavily compressed general images | ❌ | Texture generation & sharpening |

**Model Type 说明**：
- **Standard（标准模型）**：专为保持原图保真度设计，速度快，适合大部分专业和日常修复
- **Generative（生成式模型）**：基于 Stable Diffusion，能够"想象"缺失细节，适合传统放大失败的极端场景

>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)
#### Examples

```bash
# Simple 2x upscale with general model
enhance-image -u photo.jpg -o enhanced.jpg -m general_2x

# Face enhancement 4x
enhance-image -u portrait.jpg -m face_4x -o portrait_4x.jpg --keep-exif

# High fidelity with custom DPI
enhance-image -u old-photo.png -m high_fidelity_2x -dpi 300 -o hd.png

# Batch processing
for img in *.jpg; do
  enhance-image -u "$img" -o "upscaled/$img" -m general_4x
done
```

---

# VIDEO COMMAND

## Usage: `enhance-video`

### ⚠️ Important Notes

- **Resolution is required** (`--resolution` or `-r`). Must be in `WIDTHxHEIGHT` format (e.g., `1920x1080`).
- Ensure target resolution does **not exceed max output resolution** (36 MP total pixels) per API limits.
- Video processing can take **minutes to hours** depending on length. Use `--timeout` to extend if needed.
- Input video must be at a **publicly accessible URL** (local files not directly supported).

### Command Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url`, `-u` | string | **required** | URL of the video to enhance |
| `--output`, `-o` | string | `output.mp4` | Output file path |
| `--model`, `-m` | string | `general_restore_2x` | Video model (see below) |
| `--resolution`, `-r` | string | **required** | Target resolution in WxH (e.g., `1920x1080`) |
| `--original-resolution` | string | — | Original resolution (e.g., `1280x720`) - optional |
| `--extension`, `-e` | string | `.mp4` | Output extension (`.mp4`, `.mov`, `.avi`) |
| `--fps` | number | — | Target FPS (preserves original if omitted) |
| `--keep-audio` | boolean | true | Preserve audio track |
| `--poll-interval` | number | 10 | Polling interval in seconds |
| `--timeout` | number | 600 | Maximum wait time in seconds |

#### Available Video Models

<<<<<<< HEAD
| Model | Description | Use Case |
|-------|-------------|----------|
| `general_restore_1x` / `2x` / `4x` | General video restoration | General upscaling |
| `face_soft_2x` | Face-softening enhancement | Portrait videos |
| `portrait_restore_1x` / `2x` | Portrait restoration | Face-focused content |
| `ultrahd_restore_2x` | Ultra HD upscaling | Highest quality upscale |
| `generative_1x` | Generative fill | AI-powered restoration |
=======
Videos models are classified into two categories:

- **Standard Restoration & Upscale**: Focus on cleaning up footage and increasing resolution without altering fundamental content. Prioritize pixel-perfect accuracy and temporal consistency.

- **Generative Video**: Uses advanced Stable Diffusion for "impossible" restoration tasks where source video lacks sufficient data, generating realistic textures and details.

| Category | Model | Multiplier | Description | Best Use Case | Key Features |
|----------|-------|------------|-------------|---------------|--------------|
| **Standard** | `general_restore_1x` | 1x | General restoration (denoise, deblur) | Low-quality general footage | GAN-based comprehensive restoration |
| **Standard** | `general_restore_2x` | 2x | General upscale + restoration | SD/HD → 4K upscaling | Adaptive end-to-end GAN architecture |
| **Standard** | `general_restore_4x` | 4x | Extreme upscale + restoration | Extreme resolution boost | Balances detail generation & smoothing |
| **Standard** | `ultrahd_restore_2x` | 2x | Ultra HD quality upscale | 1080p → 4K professional upscale | Deep convolution, anti-aliased edges |
| **Standard** | `portrait_restore_1x` | 1x | Portrait restoration (no scale) | Moving subjects, old home movies | Multi-frame fusion, temporal stability |
| **Standard** | `portrait_restore_2x` | 2x | Portrait + upscale | Face-focused content | Spatial-temporal feature alignment |
| **Standard** | `face_soft_2x` | 2x | Face softening + enhancement | Vlogs, interviews, beauty videos | Facial keypoint detection, soft loss optimization |
| **Generative** | `generative_1x` | 1x | Generative reconstruction | Severely damaged legacy video | Multi-frame SD, temporal attention, memory mechanisms |

**Note on Temporal Stability**: Unlike image-only models, all HitPaw video engines ensure smooth transitions between frames, eliminating flickering and jitter — critical for professional-quality output.

**Resolution Guidelines**:
- Choose `*_1x` models when you want to improve quality without changing resolution (mainly denoise/deblur)
- Choose `*_2x` / `4x` when you need actual upscaling
- `original-resolution` parameter helps the API produce better quality by knowing source specs
>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)

#### Examples

```bash
# Upscale to 1080p using general_restore_2x
enhance-video -u input.mp4 -o output_1080p.mp4 -m general_restore_2x -r 1920x1080

# Upscale to 4K with specific original resolution
enhance-video -u clip.mov -o 4k.mov -m general_restore_4x -r 3840x2160 --original-resolution 1920x1080

# Denoise with portrait model
enhance-video -u portrait_video.avi -m portrait_restore_2x -r 1920x1080 -o clean_portrait.mp4

# Add color to B&W (if generative model supports)
enhance-video -u bw_vintage.mp4 -m generative_1x -r 1920x1080 -o colorized.mp4
```

---

## Coin Consumption

### Image Enhancement
- 2x/4x models: **~75 coins** per image
- 1x models: **~50 coins** per image
- Generative models: **~100+ coins** per image

### Video Enhancement
Coin costs depend on video length, model, and resolution. Approximate rates:
- Upscale models: **~200-400 coins** per minute
- Restoration models: **~150-300 coins** per minute
<<<<<<< HEAD

**Always check current rates** at: https://playground.hitpaw.com/

---
=======
>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)

**Always check current rates** at: https://playground.hitpaw.com/

<<<<<<< HEAD
=======
---

## 📋 API 最佳实践

### Rate Limiting
- API 有访问频率限制，取决于服务器当前负载
- 收到 HTTP 429 响应时，应**指数退避**重试
- 建议实现队列机制，避免并发请求过多

### HTTPS Only
- API 仅响应 HTTPS 通信
- HTTP 请求会返回 301 重定向

### Batch Processing Strategy
- 图像：由于轮询较快，可以同时运行多个独立任务（但注意 Rate Limit）
- 视频：长时间任务建议**串行化**或使用任务队列，避免过多并发占用资源

### Cost Optimization
- 先使用标准模型（Standard）测试效果，必要时再升级到生成式模型（更贵）
- 视频处理前先转码为较短的片段测试效果和费用
- 监控 Playground 的实时费率，设置预算警报

### Dimension Strategy
- **图像**：如果目标尺寸不确定，建议 `--dpi 300` 作为高质量标准
- **视频**：`original-resolution` 参数能显著提升放大质量，请务必提供原始分辨率

### Audio Handling
- 默认保留音频（`--keep-audio`）
- 如果源视频无音轨或不需要，使用 `--no-keep-audio` 可节省 ~10-20% 处理时间

---

## 🔍 故障排除

>>>>>>> 96b5b31 (docs: 丰富 HitPaw API 功能文档)
Common errors and solutions:

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid API key` | Wrong or expired key | Update `HITPAW_API_KEY` |
| `Insufficient coins` | Account balance too low | Top up at HitPaw Playground |
| `Unsupported model` | Model name typo or not available | Check model table above |
| `Invalid extension` | Output format not supported | Use `.jpg/.png/.webp` for images; `.mp4/.mov/.avi` for videos |
| `Invalid video URL` | URL not publicly accessible | Ensure video is reachable via HTTPS |
| `Input/target resolution over limit` | Exceeds 36 MP total pixels (e.g., 7680x4320 = ~33 MP) | Reduce resolution |
| `Video duration over limit` | Video longer than 1 hour | Trim video first |
| `Rate limit exceeded` | Too many requests | Wait and retry with exponential backoff |
| `Video processing failed` | Corrupt video or unsupported codec | Try different input format or re-encode |

---

## Technical Details

### API Compatibility

This skill implements the official HitPaw API as documented:
- **Base URL**: `https://api-base.hitpaw.com`
- **Image endpoint**: `POST /api/photo-enhancer`
- **Video endpoint**: `POST /api/video-enhancer`
- **Status endpoint**: `POST /api/task-status`

Both endpoints return a `job_id`. Use the status endpoint to poll until `COMPLETED`, then download from `res_url`.

### Polling Strategy

- **Images**: default poll every 5s, timeout 300s (5 min)
- **Videos**: default poll every 10s, timeout 600s (10 min)

For longer videos, increase `--timeout` as needed (e.g., `--timeout 3600` for 1 hour).

### Resolution Handling

For videos, `resolution` is **required**. Choose based on your needs:
- Keep original size? Set `resolution` to original dimensions (use `--original-resolution` for better quality).
- Upscale? Multiply original width/height by factor (2x, 4x).
- Downscale? Rare but possible; just specify smaller dimensions.

**Max output**: 36 megapixels total (width × height ≤ 36,000,000 pixels).  
Examples: 3840×2160 = 8.3 MP ✅, 7680×4320 = 33.2 MP ✅, 8192×4608 = 37.7 MP ❌.

### Audio Preservation

By default, `enhance-video` keeps the audio track (`--keep-audio`, default true). Use `--no-keep-audio` to strip audio.

---

## Support

- Image API Docs: https://developer.hitpaw.com/image/API-reference
- Video API Docs: https://developer.hitpaw.com/video/API-reference
- Playground: https://playground.hitpaw.com/
- Contact: support@hitpaw.com

This skill is an **unofficial integration** with HitPaw API. You must have a valid API key and comply with HitPaw's terms. The skill author is not responsible for any charges incurred.

## License

MIT © HitPaw-Official
