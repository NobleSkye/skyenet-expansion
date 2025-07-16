
## File Structure

```
client/src/assets/atlas/
├── 32px-atlas/
│   ├── spritesheet-32px.webp    # Your 32x32 sprite sheet image
│   └── atlas.json               # JSON mapping of sprite names to positions
└── 16px-atlas/
    ├── spritesheet-16px.webp    # Your 16x16 sprite sheet image
    └── atlas.json               # JSON mapping of sprite names to positions
```

## Usage Examples


```typescript
import { AtlasManager } from "./atlasmanager";

// Initialize the atlas manager
const atlasManager = new AtlasManager();

// Load atlases
await atlasManager.loadAtlas(
    "32px",
    "./src/assets/atlas/32px-atlas/spritesheet-32px.webp",
    "./src/assets/atlas/32px-atlas/atlas.json"
);

// Draw a texture
atlasManager.drawTexture("32px", "blue-ship", ctx, x, y);

// Draw by grid coordinates (1-indexed)
atlasManager.drawTileByGrid("32px", 1, 1, ctx, x, y);
```

### Grid System

For a 32x32 grid:
- Grid (1,1) = pixels 0-32 x, 0-32 y
- Grid (2,1) = pixels 32-64 x, 0-32 y  
- Grid (1,2) = pixels 0-32 x, 32-64 y
- Grid (2,2) = pixels 32-64 x, 32-64 y

### JSON Atlas Format

```json
{
  "sprite-name": { "x": 0, "y": 0, "width": 32, "height": 32 },
  "another-sprite": { "x": 32, "y": 0, "width": 32, "height": 32 }
}
```
