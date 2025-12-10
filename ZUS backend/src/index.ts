import express, { Request, Response } from "express";
import cors from "cors";
import { FormData } from "./types/formData";

const app = express();
app.use(express.json());
app.use(cors());

const port = Number(process.env.PORT) || 3000;

interface StoredWniosek extends FormData {
  id: number;
  createdAt: Date;
}

const wniosekStorage: StoredWniosek[] = [];
let nextId = 1;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/wniosek", (_req: Request, res: Response) => {
  res.json(wniosekStorage);
});

app.get("/wniosek/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const wniosek = wniosekStorage.find((w) => w.id === id);
  
  if (!wniosek) {
    return res.status(404).json({ error: "Wniosek not found" });
  }
  
  res.json(wniosek);
});

app.post("/wniosek", (req: Request, res: Response) => {
  const data: FormData = req.body;
  
  const storedWniosek: StoredWniosek = {
    ...data,
    id: nextId++,
    createdAt: new Date(),
  };
  
  wniosekStorage.push(storedWniosek);
  console.log("Stored wniosek:", storedWniosek);
  
  res.status(201).json(storedWniosek);
});

app.delete("/wniosek/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = wniosekStorage.findIndex((w) => w.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Wniosek not found" });
  }
  
  wniosekStorage.splice(index, 1);
  console.log("Deleted wniosek with id:", id);
  
  res.status(200).json({ message: "Wniosek deleted successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

