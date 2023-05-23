import { CrewDocument } from "@models";
import SearchClient from "search/client";
import SearchIndices from "@constants/SearchIndices";

export interface CrewSearchDocument {
  id: string;
  name: string;
}

export const CrewSearchIndex = SearchClient.index<CrewSearchDocument>(
  SearchIndices.Crew
);
CrewSearchIndex.primaryKey = "id";

export const search_UpdateCrew = async (crew: CrewDocument) => {
  if (process.env.NODE_ENV === "test") return;

  if (!crew.archivedAt) {
    await CrewSearchIndex.addDocuments([
      {
        id: crew._id.toString(),
        name: crew.name,
      },
    ]);
  } else {
    await CrewSearchIndex.deleteDocument(crew._id.toString());
  }
};
