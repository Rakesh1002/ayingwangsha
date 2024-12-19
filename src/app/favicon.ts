import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];

async function generateFavicons() {
  try {
    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), "public");
    await fs.mkdir(publicDir, { recursive: true });

    // Create SVG buffer
    const svgBuffer = Buffer.from(`
      <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer circle -->
        <circle cx="256" cy="256" r="240" fill="none" stroke="white" stroke-width="24"/>
        
        <!-- Inner decorative elements -->
        <circle cx="256" cy="256" r="200" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
        <circle cx="256" cy="256" r="180" fill="none" stroke="white" stroke-width="2" opacity="0.2"/>
        
        <!-- Stylized 'A' -->
        <path
          d="M256 120 L356 400 L156 400 Z"
          fill="none"
          stroke="white"
          stroke-width="24"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
        <!-- Horizontal bar of 'A' -->
        <line
          x1="196"
          y1="300"
          x2="316"
          y2="300"
          stroke="white"
          stroke-width="24"
          stroke-linecap="round"
        />
      </svg>`);

    // Create base image from SVG
    const baseImage = await sharp(svgBuffer)
      .resize(512, 512)
      .extend({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: { r: 230, g: 133, b: 165, alpha: 1 }, // #E685A5
      })
      .png()
      .toBuffer();

    // Generate different sizes with error handling
    for (const size of sizes) {
      try {
        await sharp(baseImage)
          .resize(size, size, {
            kernel: sharp.kernel.lanczos3,
            fit: "contain",
            background: { r: 230, g: 133, b: 165, alpha: 1 },
          })
          .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
        console.log(`Generated ${size}x${size} favicon`);
      } catch (error) {
        console.error(`Failed to generate ${size}x${size} favicon:`, error);
      }
    }

    // Generate favicon.ico (as PNG)
    try {
      await sharp(baseImage)
        .resize(32, 32, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 230, g: 133, b: 165, alpha: 1 },
        })
        .png()
        .toFile(path.join(publicDir, "favicon-32x32.png"));
      // Copy the 32x32 PNG to favicon.ico for compatibility
      await fs.copyFile(
        path.join(publicDir, "favicon-32x32.png"),
        path.join(publicDir, "favicon.ico"),
      );
      console.log("Generated favicon.ico");
    } catch (error) {
      console.error("Failed to generate favicon.ico:", error);
    }

    // Generate apple-touch-icon with special treatment
    try {
      await sharp(baseImage)
        .resize(180, 180, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 230, g: 133, b: 165, alpha: 1 },
        })
        .toFile(path.join(publicDir, "apple-touch-icon.png"));
      console.log("Generated apple-touch-icon.png");
    } catch (error) {
      console.error("Failed to generate apple-touch-icon.png:", error);
    }

    // Generate manifest.json
    try {
      const manifest = {
        name: "Aying Wangsha - Professional Makeup Artist",
        short_name: "Aying Wangsha",
        description:
          "Award-winning makeup artist in Bangalore and Mumbai specializing in bridal, editorial, and fashion makeup.",
        start_url: "/",
        display: "standalone",
        background_color: "#030203",
        theme_color: "#E685A5",
        icons: sizes.map((size) => ({
          src: `/favicon-${size}x${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
          purpose: "any maskable",
        })),
        categories: ["beauty", "fashion", "lifestyle"],
        orientation: "portrait",
        lang: "en-IN",
      };

      await fs.writeFile(
        path.join(publicDir, "manifest.json"),
        JSON.stringify(manifest, null, 2),
      );
      console.log("Generated manifest.json");
    } catch (error) {
      console.error("Failed to generate manifest.json:", error);
    }

    console.log("Successfully completed favicon generation");
  } catch (error) {
    console.error("Fatal error during favicon generation:", error);
    process.exit(1);
  }
}

generateFavicons();
