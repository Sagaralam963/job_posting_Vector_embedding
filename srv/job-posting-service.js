import * as AIHelper from './helper/ai-helper.js';
import * as DBUtils from './helper/db-utils.js';

export default function () {
    this.on('createVectorEmbeddings', async () => {
        const embeddings = await AIHelper.createVectorEmbeddings();
        const embeddingEntries = await DBUtils.createEmbeddingEntries(embeddings);
        await DBUtils.insertVectorEmbeddings(embeddingEntries);

        return {
            count: embeddingEntries.length,
            chunks: embeddingEntries.length,
            message: 'Vector embeddings created and stored in database'
        };
    });


    this.on('createJobPosting', async (req) => {
        const user_query = req.data.user_query;
        validateInputParameter(user_query);

        const [userQuery, ragResponse] = await AIHelper.orchestrateJobPostingCreation(user_query);
        const entry = DBUtils.createJobPosting([userQuery, ragResponse]);
        await DBUtils.insertJobPosting(entry);

        return entry;
    });

    this.on('deleteJobPosting', 'JobPosting', async (req) => {
        const ID = req.params[0].ID;

        const result = await DBUtils.deleteJobPosting(ID);

        return {
            success: true,
            message: result
        };
    });

    this.on('deleteAll', 'JobPosting', async (req) => {
        const result = await DBUtils.deleteJobPostings();

        return {
            success: true,
            message: result
        };
    });


    this.on('deleteAll', 'DocumentChunk', async (req) => {
        const result = await DBUtils.deleteVectorEmbeddings();

        return {
            success: true,
            message: result
        };
    });
}


const wrongInputError = 'Required input parameters not supplied';

function validateInputParameter(parameter) {
    if (typeof parameter === 'undefined') {
        throw new Error(wrongInputError);
    }

    function isEmpty(input) {
        return input.trim() === '';
    }

    if (isEmpty(parameter)) {
        throw new Error(wrongInputError);
    }
}