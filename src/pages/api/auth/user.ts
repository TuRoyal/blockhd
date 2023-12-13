import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
 const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { method } = req;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  try {
    switch (method) {
      case "PATCH":
        if (token?.email) {
          console.log( req.body , " req.body");
          let updates = await prisma.user.update({
            where: {
              email: token?.email,
            },
            data: req.body,
          });
          res.status(200).send(updates);
        } else {
          res.status(200).send(`chua dang nhap`);
        }
        break;

        case "GET":
          if (token?.email) {
            let data = await prisma.user.findFirst({
              where: {
                email: token?.email,
              },
            });
            res.status(200).send(data);
          } else {
            res.status(200).send(`chua dang nhap`);
          }
          break;

      default:
        res.setHeader("Allow", ["PATCH", "GET"]);
        res.status(200).end(`method: ${method} not Allow`);
        break;
    }
  } catch (error) {
    res.status(500).json({ mes: "failed to fetch data", error });
  }
}
export default handler;
