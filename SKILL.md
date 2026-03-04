---
name: hitpaw-image-enhancer
description: Enhance and upscale images using HitPaw's AI image enhancement API
version: 1.0.0
author: Nova (HitPaw-Official)
type: cli
entry: dist/cli.js
repository: https://github.com/HitPaw-Official/openclaw-skill-hitpaw-enhancer
keywords:
  - image
  - enhancement
  - upscale
  - hitpaw
  - ai
license: MIT

capabilities:
  - image_enhancement
  - image_upscaling
  - photo_enhance

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

# HitPaw Image Enhancer Skill

A powerful OpenClaw skill that integrates HitPaw's state-of-the-art AI image enhancement technology. Enhance, upscale, and restore images with multiple AI models.

## Features

- 🚀 **Upscale images 2x or 4x** without quality loss
- 👤 **Face enhancement** with specialized models
- 🌟 **Multiple models**: General, Face, High Fidelity, Denoise
- 📊 **Real-time progress tracking** with polling
- 📦 **Batch processing** support
- ⚙️ **Configurable DPI** and EXIF preservation

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

## Usage

```bash
# Basic enhancement (2x upscale with general model)
enhance-image --url https://example.com/photo.jpg --output enhanced.jpg

# Face enhancement 2x
enhance-image --url photo.jpg --model face_2x --output face_enhanced.jpg

# High fidelity 4x with custom DPI
enhance-image --url photo.jpg --model high_fidelity_4x --dpi 300 --output hd.jpg

# Preserve EXIF data
enhance-image --url photo.jpg --keep-exif --output preserved.jpg
```

## Command Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url`, `-u` | string | **required** | URL or local file path of the image to enhance |
| `--output`, `-o` | string | `output.jpg` | Output file path |
| `--model`, `-m` | string | `general_2x` | Model to use: `general_2x`, `general_4x`, `face_2x`, `face_4x`, `face_v2_2x`, `face_v2_4x`, `high_fidelity_2x`, `high_fidelity_4x`, `sharpen_denoise_1x`, `detail_denoise_1x`, `generative_portrait_1x`, `generative_portrait_2x`, `generative_portrait_4x`, `generative_1x`, `generative_2x`, `generative_4x` |
| `--extension`, `-e` | string | `.jpg` | Output file extension (`.jpg`, `.png`, `.webp`) |
| `--dpi` | number | original | Target DPI for output (metadata only) |
| `--keep-exif` | boolean | false | Preserve EXIF data from original |
| `--poll-interval` | number | 5 | Polling interval in seconds |
| `--timeout` | number | 300 | Maximum wait time in seconds |

## Available Models

| Model | Multiplier | Best For | DPI Support |
|-------|------------|----------|-------------|
| `general_2x` / `general_4x` | 2x / 4x | General photos, landscapes | ✅ |
| `face_2x` / `face_4x` | 2x / 4x | Portrait & face enhancement | ✅ |
| `face_v2_2x` / `face_v2_4x` | 2x / 4x | Improved face model | ✅ |
| `high_fidelity_2x` / `high_fidelity_4x` | 2x / 4x | High quality preservation | ✅ |
| `sharpen_denoise_1x` | 1x | Denoise & sharpen | ✅ |
| `detail_denoise_1x` | 1x | Detail preservation | ✅ |
| `generative_*` | 1x/2x/4x | AI generative fill | ❌ |

## Examples

```bash
# Simple upscale
enhance-image -u portrait.jpg -o portrait_2x.jpg -m face_2x

# Batch process (in shell)
for img in *.jpg; do
  enhance-image -u "$img" -o "enhanced/$img" -m general_4x
done

# Download and enhance from URL
enhance-image -u https://example.com/old-photo.png -o restored.png -m generative_1x
```

## Coin Consumption

Each enhancement consumes **HitPaw coins** from your account. Costs vary by model:
- 2x/4x models: ~75 coins per image
- 1x models: ~50 coins per image
- Generative models: ~100+ coins

Check your balance at: https://playground.hitpaw.com/

## Error Handling

The skill provides clear error messages:
- `api_key is not valid` → Check your `HITPAW_API_KEY`
- `The coins are not enough` → Top up your HitPaw account
- `The model is not supported` → Verify model name
- `429` rate limit → Wait and retry

## Support

- API Docs: https://developer.hitpaw.com/image/API-reference
- Playground: https://playground.hitpaw.com/
- Contact: support@hitpaw.com

## License

MIT. This skill is an independent integration with HitPaw API.
