import cds from '@sap/cds';
const { INSERT, DELETE } = cds.ql;
const { JobPosting, DocumentChunk } = cds.entities;



export function createJobPosting([userQuery, ragResponse]) {
  const entry = {
    user_query: userQuery,
    rag_response: ragResponse,
  };
  return entry;
}

export async function insertJobPosting(jobPosting) {
  try {
    await INSERT.into(JobPosting).entries(jobPosting);
    return 'Job Posting inserted successfully to table.';
  } catch (error) {
    console.log(`Error while storing the Job Posting to SAP HANA Cloud. \n Error: ${error.response}`);
    throw error;
  }
}

export async function deleteJobPosting(withID) {
  try {
    await DELETE.from(JobPosting).where(JobPosting.id == withID);
    return `Successfully deleted Job Posting with ID: ${withID}`;
  } catch (error) {
    console.log(`Error while deleting Job Posting with ID: ${withID} because: \n Error: ${error.response}`);
    throw error;
  }
}


export function createEmbeddingEntries([embeddings, splitDocuments]) {

    let embeddingEntries = [];
    for (const [index, embedding] of embeddings.entries()) {
        const embeddingEntry = {
            metadata: splitDocuments[index].metadata.source,
            text_chunk: splitDocuments[index].pageContent,
            embedding: `[${embedding}]`
        };
        embeddingEntries.push(embeddingEntry);
    }

    return embeddingEntries;
}


export async function insertVectorEmbeddings(embeddingEntries) {
    try {
        await INSERT.into(DocumentChunk).entries(embeddingEntries);

        return `Embeddings inserted successfully to table.`;
    } catch (error) {
        console.log(
            `Error while storing the vector embeddings to SAP HANA Cloud: ${error.toString()}`
        );
        throw error;
    }
}


export async function deleteVectorEmbeddings() {
  try {
    await DELETE.from(DocumentChunk);
    return 'Successfully deleted Document Chunks!';
  } catch (error) {
    console.log(
      `Error while deleting Document Chunks: \n ${JSON.stringify(error.response)}`
    );
  }
}