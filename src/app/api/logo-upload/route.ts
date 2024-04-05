import mercury from "@mercury-js/core";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { MercuryInstance } from "../graphql/route";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sizeOff from "image-size";

const client = new S3Client({
  region: process.env.AWS_REGION_KEY,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const name = data.get("name")!;

    if (!file) {
      throw new Error("File not found");
    }

    const dimensions = sizeOff(Buffer.from(await file.arrayBuffer()));
    console.log(dimensions);
    if (dimensions.type !== "png") {
      throw new Error("PNG type images are only allowed");
    }

    if (dimensions.height! > 100 || dimensions.width! > 200) {
      throw new Error("Logo cannot be more than 100px height and 200px width");
    }

    const command = new PutObjectCommand({
      Bucket: `${process.env.BUCKET_NAME}`,
      Key: "logo.png",
      Body: Buffer.from(await file.arrayBuffer()),
      ACL: "public-read"
    });
    await client.send(command);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return new NextResponse(error.message);
  }
}
