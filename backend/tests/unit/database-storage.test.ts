import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockPrisma } = vi.hoisted(() => ({
  mockPrisma: {
    $executeRawUnsafe: vi.fn().mockResolvedValue(0),
    mediaAsset: {
      create: vi.fn().mockResolvedValue({ id: "8f116010-b7d7-4d99-9218-a9452cfef928" }),
      delete: vi.fn().mockResolvedValue({})
    }
  }
}));

vi.mock("../../src/config/database.js", () => ({ prisma: mockPrisma }));

import { DatabaseStorageProvider } from "../../src/services/storage/database.js";

describe("DatabaseStorageProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stores image bytes and returns a public media URL", async () => {
    const provider = new DatabaseStorageProvider();
    const result = await provider.save({
      buffer: Buffer.from([1, 2, 3]),
      originalname: "tour.png",
      mimetype: "image/png"
    }, "tour");

    expect(mockPrisma.$executeRawUnsafe).toHaveBeenCalledOnce();
    expect(mockPrisma.mediaAsset.create).toHaveBeenCalledWith({
      data: {
        content: Uint8Array.from([1, 2, 3]),
        mimeType: "image/png",
        originalName: "tour.png",
        size: 3
      },
      select: { id: true }
    });
    expect(result).toEqual({
      storedPath: "8f116010-b7d7-4d99-9218-a9452cfef928",
      url: "/api/v1/media/8f116010-b7d7-4d99-9218-a9452cfef928"
    });
  });

  it("deletes database media by its public URL", async () => {
    const provider = new DatabaseStorageProvider();
    await provider.delete("/api/v1/media/8f116010-b7d7-4d99-9218-a9452cfef928");

    expect(mockPrisma.mediaAsset.delete).toHaveBeenCalledWith({
      where: { id: "8f116010-b7d7-4d99-9218-a9452cfef928" }
    });
  });

  it("leaves legacy non-database image URLs alone", async () => {
    const provider = new DatabaseStorageProvider();
    await provider.delete("https://res.cloudinary.com/example/image.jpg");

    expect(mockPrisma.mediaAsset.delete).not.toHaveBeenCalled();
  });
});
