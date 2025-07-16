import { TextureAtlas } from "./textureatlas";

export class AtlasManager {
    private atlases: Map<string, TextureAtlas> = new Map();
    private loadingPromises: Map<string, Promise<TextureAtlas>> = new Map();

    constructor() {}

    // Load an atlas from a specific folder
    public async loadAtlas(name: string, imagePath: string, jsonPath: string): Promise<TextureAtlas> {
        if (this.loadingPromises.has(name)) {
            return this.loadingPromises.get(name)!;
        }

        const loadPromise = TextureAtlas.fromJSON(imagePath, jsonPath);
        this.loadingPromises.set(name, loadPromise);

        try {
            const atlas = await loadPromise;
            this.atlases.set(name, atlas);
            return atlas;
        } catch (error) {
            this.loadingPromises.delete(name);
            throw error;
        }
    }

    // Load grid-based atlas
    public loadGridAtlas(name: string, imagePath: string, tileSize: number): TextureAtlas {
        const atlas = TextureAtlas.createGridAtlas(imagePath, tileSize);
        this.atlases.set(name, atlas);
        return atlas;
    }

    // Get a specific atlas
    public getAtlas(name: string): TextureAtlas | undefined {
        return this.atlases.get(name);
    }

    // Draw texture from any atlas
    public drawTexture(
        atlasName: string,
        textureName: string,
        ctx: CanvasRenderingContext2D,
        dx: number,
        dy: number,
        dWidth?: number,
        dHeight?: number
    ): boolean {
        const atlas = this.atlases.get(atlasName);
        if (!atlas) {
            console.warn(`Atlas "${atlasName}" not found`);
            return false;
        }

        atlas.drawTexture(ctx, textureName, dx, dy, dWidth, dHeight);
        return true;
    }

    // Draw tile by grid coordinates
    public drawTileByGrid(
        atlasName: string,
        gridX: number,
        gridY: number,
        ctx: CanvasRenderingContext2D,
        dx: number,
        dy: number,
        dWidth?: number,
        dHeight?: number
    ): boolean {
        const atlas = this.atlases.get(atlasName);
        if (!atlas) {
            console.warn(`Atlas "${atlasName}" not found`);
            return false;
        }

        atlas.drawTileByGrid(ctx, gridX, gridY, dx, dy, dWidth, dHeight);
        return true;
    }

    // Check if all atlases are loaded
    public areAllLoaded(): boolean {
        return Array.from(this.atlases.values()).every(atlas => atlas.isLoaded());
    }

    // Get all atlas names
    public getAtlasNames(): string[] {
        return Array.from(this.atlases.keys());
    }

    // Preload common atlases
    public static async createWithCommonAtlases(): Promise<AtlasManager> {
        const manager = new AtlasManager();
        
        // Load 32px atlas
        await manager.loadAtlas(
            "32px",
            "./src/assets/atlas/32px-atlas/spritesheet-32px.webp",
            "./src/assets/atlas/32px-atlas/atlas.json"
        );

        // Load 16px atlas
        await manager.loadAtlas(
            "16px",
            "./src/assets/atlas/16px-atlas/spritesheet-16px.webp",
            "./src/assets/atlas/16px-atlas/atlas.json"
        );

        return manager;
    }
}
