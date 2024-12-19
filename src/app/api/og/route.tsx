import { ImageResponse } from "@vercel/og";
import { S3_KEYS } from "@/lib/constants";

export const runtime = "edge";

export async function GET() {
  try {
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
            fontFamily: "serif",
          }}
        >
          {/* Background Images */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.5,
              padding: "32px",
            }}
          >
            {portfolioImages.map((s3Key, i) => (
              <div
                key={i}
                style={{
                  width: "25%",
                  height: "50%",
                  padding: "8px",
                  display: "flex",
                }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${s3Key}`}
                  alt={`Portfolio image ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
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
            }}
          >
            {/* Title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              <div
                style={{
                  color: "#E685A5",
                  fontSize: 32,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                Award-Winning Makeup Artist
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "48px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: 96,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  Aying
                </div>
                <div
                  style={{
                    color: "#E685A5",
                    fontSize: 96,
                    fontWeight: 700,
                    lineHeight: 1,
                    fontStyle: "italic",
                  }}
                >
                  Wangsha
                </div>
              </div>
            </div>

            {/* Services */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "white",
                fontSize: 28,
                opacity: 0.9,
                marginBottom: "32px",
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
                fontSize: 32,
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
      }
    );
  } catch (e) {
    console.error("OG Image Error:", e);
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#030203",
            color: "#E685A5",
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          Aying Wangsha - Professional Makeup Artist
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
