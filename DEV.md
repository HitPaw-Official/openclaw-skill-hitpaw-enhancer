git clone https://github.com/HitPaw-Official/openclaw-skill-hitpaw-enhancer.git
cd openclaw-skill-hitpaw-enhancer
npm install
npm run build

# Set your API key
export HITPAW_API_KEY="your_key_here"

# Use the CLI directly
node dist/cli.js -u https://example.com/image.jpg -o enhanced.jpg -m general_2x

# Or install globally for convenience
npm link
enhance-image -u image.jpg -m face_2x -o enhanced.jpg
```

## Development

```bash
# Build TypeScript
npm run build

# Run directly
npm start -- -u <url> -o output.jpg
```

## Publishing to ClawHub

```bash
clawhub login
clawhub publish .
```

## Disclaimer

This skill is an unofficial integration with HitPaw API. You are responsible for:
- Your own HitPaw API key and associated costs
- Compliance with HitPaw's terms of service
- Images you submit (ensure you have rights)

## License

MIT © HitPaw-Official
