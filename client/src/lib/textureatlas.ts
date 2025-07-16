export interface TextureRegion {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class TextureAtlas {
    private image: HTMLImageElement;
    private regions: Map<string, TextureRegion>;
    private loaded: boolean = false;

    constructor(imagePath: string, atlasData: Record<string, TextureRegion>) {
        this.image = new Image();
        this.regions = new Map(Object.entries(atlasData));
        
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.src = imagePath;
    }

    // Static method to create atlas from JSON file
    public static async fromJSON(imagePath: string, jsonPath: string): Promise<TextureAtlas> {
        const response = await fetch(jsonPath);
        const atlasData = await response.json();
        return new TextureAtlas(imagePath, atlasData);
    }

    public drawTexture(
        ctx: CanvasRenderingContext2D,
        textureName: string,
        dx: number,
        dy: number,
        dWidth?: number,
        dHeight?: number
    ): void {
        if (!this.loaded) return;
        
        const region = this.regions.get(textureName);
        if (!region) {
            console.warn(`Texture "${textureName}" not found in atlas`);
            return;
        }

        if (dWidth !== undefined && dHeight !== undefined) {
            ctx.drawImage(
                this.image,
                region.x, region.y, region.width, region.height,
                dx, dy, dWidth, dHeight
            );
        } else {
            ctx.drawImage(
                this.image,
                region.x, region.y, region.width, region.height,
                dx, dy, region.width, region.height
            );
        }
    }

    public isLoaded(): boolean {
        return this.loaded;
    }

    public getRegion(textureName: string): TextureRegion | undefined {
        return this.regions.get(textureName);
    }

    public hasTexture(textureName: string): boolean {
        return this.regions.has(textureName);
    }

    public getTextureNames(): string[] {
        return Array.from(this.regions.keys());
    }
}
