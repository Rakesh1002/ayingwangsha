import { ImageResponse } from "@vercel/og";
import { S3_KEYS } from "@/lib/constants";

export const runtime = "edge";

export async function GET() {
  try {
    const playfairDisplay = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
      ),
    ).then((res) => res.arrayBuffer());

    // Get a mix of images from different categories
    const portfolioImages = [
      ...S3_KEYS.portfolio.bridal.slice(0, 2),
      ...S3_KEYS.portfolio.celebrity.slice(0, 2),
      ...S3_KEYS.portfolio.editorial.slice(0, 2),
      ...S3_KEYS.portfolio.model.slice(0, 2),
    ];

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#030203",
            position: "relative",
          }}
        >
          {/* Background Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              padding: "32px",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.3,
            }}
          >
            {portfolioImages.map((s3Key, i) => (
              <img
                key={i}
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${s3Key}`}
                alt={`Portfolio image ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>

          {/* Content Overlay */}
          <div
            style={{
              background:
                "linear-gradient(to bottom, rgba(3,2,3,0.7), rgba(3,2,3,0.95))",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px",
              gap: "24px",
            }}
          >
            {/* Title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  color: "#E685A5",
                  fontSize: 24,
                  fontFamily: "Playfair Display",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Award-Winning Makeup Artist
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: 72,
                  fontFamily: "Playfair Display",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  textAlign: "center",
                }}
              >
                Aying
                <br />
                <span style={{ color: "#E685A5", fontStyle: "italic" }}>
                  Wangsha
                </span>
              </div>
            </div>

            {/* Services */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                color: "white",
                fontSize: 20,
                opacity: 0.8,
                fontFamily: "Playfair Display",
              }}
            >
              <span>Bridal</span>
              <span>•</span>
              <span>Editorial</span>
              <span>•</span>
              <span>Fashion</span>
              <span>•</span>
              <span>Celebrity</span>
            </div>

            {/* Location */}
            <div
              style={{
                color: "#E685A5",
                fontSize: 24,
                fontFamily: "Playfair Display",
                opacity: 0.9,
              }}
            >
              Bangalore & Mumbai
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Playfair Display",
            data: playfairDisplay,
            style: "normal",
          },
        ],
      },
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
