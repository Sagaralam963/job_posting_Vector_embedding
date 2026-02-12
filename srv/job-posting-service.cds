using {sap.codejam as db} from '../db/schema';

service JobPostingService {

    entity DocumentChunk as
        projection on db.DocumentChunk
        excluding {
            embedding
        }

        actions {
            // Bound to collection - operates on all document chunks
            action deleteAll(in: many $self) returns StatusResponse;
        }

    entity JobPosting    as projection on db.JobPosting
    actions {
        // Bound to specific instance - delete this job posting
        action deleteJobPosting()                    returns StatusResponse;
        // Bound to collection - delete all job postings
        action deleteAll(in: many $self)             returns StatusResponse;
    };

action createVectorEmbeddings()                      returns VectorEmbeddingResult;

// Type definitions for structured returns
type StatusResponse {
    success : Boolean;
    message : String;
}

type VectorEmbeddingResult {
    count   : Integer;
    chunks  : Integer;
    message : String;
}

action createJobPosting(user_query: String not null) returns JobPosting;

}
