namespace sap.codejam;

using { cuid, managed } from '@sap/cds/common';

entity JobPosting : cuid, managed {
    user_query   : String;
    rag_response : String;
}

entity DocumentChunk : cuid, managed {
    metadata    : LargeString;
    text_chunk : LargeString;
    embedding   : Vector(1536);
}

