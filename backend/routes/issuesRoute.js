import express from 'express';
import { Issue } from '../models/issueModel.js';

const router = express.Router();

// route to save a new issue in database
router.post('/', async (req, res) => { 
    try{
        if (!req.body.status || 
            !req.body.title || 
            !req.body.author || 
            !req.body.severity || 
            !req.body.description
        ) {
            return res.status(400).send({
                message: 'Send all required fields: status, title, author, severity & description.'
            });
        };

        const newIssue = {
            status: req.body.status,
            title: req.body.title,
            author: req.body.author,
            severity: req.body.severity,
            description: req.body.description,
            notes: req.body.notes
        };

        const issue = await Issue.create(newIssue);
        return res.status(201).send(issue);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    };
});

// Route to get all issues from database
router.get('/', async (req, res) => {
    try{
        const issues = await Issue.find({});

        return res.status(200).json({
            count: issues.length,
            data: issues
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    };
});

// Route to get a single issue from database
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const issue = await Issue.findById(id);

        return res.status(200).json(issue);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    };
});

// route for updating an issue
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIssueData = req.body;
        const newNotes = req.body.notes;

        let issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found.' });
        }

        issue.status = updatedIssueData.status || issue.status;
        issue.title = updatedIssueData.title || issue.title;
        issue.author = updatedIssueData.author || issue.author;
        issue.severity = updatedIssueData.severity || issue.severity;
        issue.description = updatedIssueData.description || issue.description;

        // Ensure newNotes is an array of strings
        issue.notes = Array.isArray(newNotes) ? newNotes : [newNotes];

        issue = await issue.save();

        return res.status(200).json({ message: 'Issue updated successfully.' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    };
});


// route for deleting an issue
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the id from request parameters

        // delete the issue in the database
        const result = await Issue.findByIdAndDelete(id);

        // If no issue found with the given id, return 404 Not Found
        if (!result) {
            return res.status(404).json({ message: 'Issue not found.' });
        }
        // Issue deleted successfully message
        return res.status(200).json({ message: 'Issue deleted successfully.' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;