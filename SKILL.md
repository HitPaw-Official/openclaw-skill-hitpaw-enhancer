---
name: hitpaw-image-enhancer
description: Enhance images and videos using HitPaw's AI enhancement API
version: 1.1.0
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
  node: >=18
  packages:
    - axios
    - commander
    - ora
    - chalk
    - fs-extra

environment:
  variables:
    - HITPAW_API_KEY
      description: Your HitPaw API key
      required: true

---

# HitPaw Image & Video Enhancer Skill

A powerful OpenClaw skill that integrates HitPaw's state-of-the-art AI enhancement technology for both **images** and **videos**. Enhance, upscale, restore, and denoise with multiple AI models.

## Features

### Image Enhancement
- 🚀 **Upscale images 2x or 4x** without quality loss
- 👤 **Face enhancement** with specialized models
- 🌟 **Multiple models**: General, Face, High Fidelity, Denoise, Generative
- 📊 **Real-time progress tracking** with polling
- ⚙️ **Configurable DPI** and EXIF preservation

### Video Enhancement
- 🎬 **Upscale videos 2x or 4x**
- 🎨 **Colorize** black & white videos
- 🌊 **Denoise** and **smooth** video
- 🎯 **Multiple specialized models** for different needs
- ⏱️ **Long-running job support** with extended polling
- 🎵 **Audio preservation** option

## Installation

```bash
clawhub install hitpaw-image-enhancer
```

## Configuration

Set your HitPaw API key:

```bash
export HITPAW_API_KEY="your_api_key_here"
```

Or create a `.env` file in your OpenClaw workspace:

```
HITPAW_API_KEY=your_api_key_here
```

Get your API key at: https://playground.hitpaw.com/

---

# IMAGE COMMAND

## Usage: `enhance-image`

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

| Model | Multiplier | Best For | DPI Support |
|-------|------------|----------|-------------|
| `general_2x` / `general_4x` | 2x / 4x | General photos, landscapes | ✅ |
| `face_2x` / `face_4x` | 2x / 4x | Portrait & face enhancement | ✅ |
| `face_v2_2x` / `face_v2_4x` | 2x / 4x | Improved face model | ✅ |
| `high_fidelity_2x` / `high_fidelity_4x` | 2x / 4x | High quality preservation | ✅ |
| `sharpen_denoise_1x` | 1x | Denoise & sharpen | ✅ |
| `detail_denoise_1x` | 1x | Detail preservation | ✅ |
| `generative_*` (1x/2x/4x) | — | AI generative fill | ❌ |

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

### Command Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url`, `-u` | string | **required** | URL of the video to enhance |
| `--output`, `-o` | string | `output.mp4` | Output file path |
| `--model`, `-m` | string | `upscale_2x` | Video model (see below) |
| `--extension`, `-e` | string | `.mp4` | Output extension (`.mp4`, `.mov`, `.avi`) |
| `--fps` | number | — | Target FPS (preserves original if omitted) |
| `--keep-audio` | boolean | true | Preserve audio track |
| `--poll-interval` | number | 10 | Polling interval in seconds |
| `--timeout` | number | 600 | Maximum wait time in seconds (videos take longer) |

#### Available Video Models

| Model | Type | Best For |
|-------|------|----------|
| `upscale_2x` / `upscale_4x` | Upscaling | Increase resolution 2x/4x |
| `colorize` | Colorization | Add color to black & white videos |
| `denoise` | Denoising | Remove noise and artifacts |
| `smooth` | Smoothing | Reduce jitter and improve clarity |
| `stabilize` | Stabilization | Reduce camera shake (if supported) |

#### Examples

```bash
# Upscale video 2x
enhance-video -u input.mp4 -o upscaled_2x.mp4 -m upscale_2x

# Denoise and keep audio
enhance-video -u noisy.mov -m denoise -o clean.mp4 --keep-audio

# Colorize B&W video
enhance-video -u bw_video.avi -m colorize -o colorized.mp4 -e .mp4
```

---

## Coin Consumption

### Image Enhancement
- 2x/4x models: **~75 coins** per image
- 1x models: **~50 coins** per image
- Generative models: **~100+ coins** per image

### Video Enhancement
- Upscale (2x/4x): **~200-400 coins** per minute of video
- Colorize/Denoise/Smooth: **~150-300 coins** per minute
- Prices vary by length and model; see HitPaw Playground for current rates.

Check your balance: https://playground.hitpaw.com/

---

## Error Handling

Common errors and solutions:

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid API key` | Wrong or expired key | Update `HITPAW_API_KEY` |
| `Insufficient coins` | Account balance too low | Top up at HitPaw Playground |
| `Unsupported model` | Model name typo or not available | Check model table above |
| `Invalid extension` | Output format not supported | Use `.jpg/.png/.webp` for images, `.mp4/.mov/.avi` for videos |
| `Rate limit exceeded` | Too many requests | Wait and retry |
| `Video processing failed` | Corrupt video or unsupported codec | Try different input format |

---

## Technical Notes

- Both image and video jobs are **asynchronous**: submit → poll → download.
- For video, default timeout is 600s (10 min). Longer videos may need `--timeout` increase.
- Video processing time depends on length and resolution; could take minutes to hours for long videos.
- Output quality depends on input; very low-quality sources may have limited improvement.
- Network interruption after job submission: you can resume by polling `job_id` manually (not implemented in this skill yet).

---

## Support

- Image API Docs: https://developer.hitpaw.com/image/API-reference
- Video API Docs: https://developer.hitpaw.com/video/API-reference
- Playground: https://playground.hitpaw.com/
- Contact: support@hitpaw.com

This skill is an **unofficial integration** with HitPaw API. You are responsible for your own API key and associated costs.

## License

MIT © HitPaw-Official
