import { MaterialDocument } from "@models";
import SearchClient from "search/client";
import SearchIndices from "@constants/SearchIndices";

export interface MaterialSearchDocument {
  id: string;
  name: string;
}

export const MaterialSearchIndex = SearchClient.index<MaterialSearchDocument>(
  SearchIndices.Material
);
MaterialSearchIndex.primaryKey = "id";

export const search_UpdateMaterial = async (material: MaterialDocument) => {
  if (process.env.NODE_ENV === "test") return;

  if (!material.archivedAt) {
    await MaterialSearchIndex.addDocuments([
      {
        id: material._id.toString(),
        name: material.name,
      },
    ]);
  } else {
    await MaterialSearchIndex.deleteDocument(material._id.toString());
  }
};
