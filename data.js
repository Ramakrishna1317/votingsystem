// Data Management Module - Handles all localStorage operations

class DataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize with demo data if not exists
        if (!localStorage.getItem('votingSystem_initialized')) {
            this.resetToDefaultData();
            localStorage.setItem('votingSystem_initialized', 'true');
        }
    }

    resetToDefaultData() {
        // Default users
        const users = [
            {
                id: 'user_1',
                username: 'admin',
                password: 'admin123', // In production, this would be hashed
                role: 'admin',
                fullName: 'System Administrator',
                email: 'admin@votingsystem.com',
                createdAt: new Date().toISOString()
            },
            {
                id: 'user_2',
                username: 'voter1',
                password: 'pass123',
                role: 'voter',
                fullName: 'John Doe',
                email: 'john@example.com',
                createdAt: new Date().toISOString()
            },
            {
                id: 'user_3',
                username: 'voter2',
                password: 'pass123',
                role: 'voter',
                fullName: 'Jane Smith',
                email: 'jane@example.com',
                createdAt: new Date().toISOString()
            },
            {
                id: 'user_4',
                username: 'voter3',
                password: 'pass123',
                role: 'voter',
                fullName: 'Mike Johnson',
                email: 'mike@example.com',
                createdAt: new Date().toISOString()
            }
        ];

        // Default election
        const elections = [
            {
                id: 'election_1',
                title: 'Student Council President 2024',
                description: 'Vote for your next Student Council President',
                startDate: new Date(Date.now() - 86400000).toISOString(), // Started yesterday
                endDate: new Date(Date.now() + 86400000 * 7).toISOString(), // Ends in 7 days
                status: 'active',
                createdBy: 'user_1',
                createdAt: new Date().toISOString()
            }
        ];

        // Default candidates
        const candidates = [
            {
                id: 'candidate_1',
                electionId: 'election_1',
                name: 'Alice Williams',
                manifesto: 'Committed to improving student facilities and organizing more campus events. Focus on mental health support and academic resources.',
                photo: '👩‍🎓',
                createdAt: new Date().toISOString()
            },
            {
                id: 'candidate_2',
                electionId: 'election_1',
                name: 'Bob Martinez',
                manifesto: 'Dedicated to enhancing communication between students and administration. Priority on sustainability initiatives and career development.',
                photo: '👨‍🎓',
                createdAt: new Date().toISOString()
            },
            {
                id: 'candidate_3',
                electionId: 'election_1',
                name: 'Carol Chen',
                manifesto: 'Passionate about diversity and inclusion. Plans to create more opportunities for student engagement and leadership development.',
                photo: '👩‍💼',
                createdAt: new Date().toISOString()
            }
        ];

        localStorage.setItem('votingSystem_users', JSON.stringify(users));
        localStorage.setItem('votingSystem_elections', JSON.stringify(elections));
        localStorage.setItem('votingSystem_candidates', JSON.stringify(candidates));
        localStorage.setItem('votingSystem_votes', JSON.stringify([]));
        localStorage.setItem('votingSystem_auditLogs', JSON.stringify([]));
    }

    // User operations
    getUsers() {
        return JSON.parse(localStorage.getItem('votingSystem_users') || '[]');
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    getUserByUsername(username) {
        const users = this.getUsers();
        return users.find(user => user.username === username);
    }

    addUser(user) {
        const users = this.getUsers();
        users.push({
            ...user,
            id: 'user_' + Date.now(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('votingSystem_users', JSON.stringify(users));
        return users[users.length - 1];
    }

    updateUser(id, updates) {
        const users = this.getUsers();
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem('votingSystem_users', JSON.stringify(users));
            return users[index];
        }
        return null;
    }

    deleteUser(id) {
        const users = this.getUsers();
        const filtered = users.filter(user => user.id !== id);
        localStorage.setItem('votingSystem_users', JSON.stringify(filtered));
    }

    // Election operations
    getElections() {
        return JSON.parse(localStorage.getItem('votingSystem_elections') || '[]');
    }

    getElectionById(id) {
        const elections = this.getElections();
        return elections.find(election => election.id === id);
    }

    getActiveElections() {
        const elections = this.getElections();
        const now = new Date();
        return elections.filter(election => {
            const start = new Date(election.startDate);
            const end = new Date(election.endDate);
            return election.status === 'active' && start <= now && end >= now;
        });
    }

    addElection(election) {
        const elections = this.getElections();
        elections.push({
            ...election,
            id: 'election_' + Date.now(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('votingSystem_elections', JSON.stringify(elections));
        return elections[elections.length - 1];
    }

    updateElection(id, updates) {
        const elections = this.getElections();
        const index = elections.findIndex(election => election.id === id);
        if (index !== -1) {
            elections[index] = { ...elections[index], ...updates };
            localStorage.setItem('votingSystem_elections', JSON.stringify(elections));
            return elections[index];
        }
        return null;
    }

    deleteElection(id) {
        const elections = this.getElections();
        const filtered = elections.filter(election => election.id !== id);
        localStorage.setItem('votingSystem_elections', JSON.stringify(filtered));
        
        // Also delete associated candidates and votes
        this.deleteCandidatesByElection(id);
        this.deleteVotesByElection(id);
    }

    // Candidate operations
    getCandidates() {
        return JSON.parse(localStorage.getItem('votingSystem_candidates') || '[]');
    }

    getCandidateById(id) {
        const candidates = this.getCandidates();
        return candidates.find(candidate => candidate.id === id);
    }

    getCandidatesByElection(electionId) {
        const candidates = this.getCandidates();
        return candidates.filter(candidate => candidate.electionId === electionId);
    }

    addCandidate(candidate) {
        const candidates = this.getCandidates();
        candidates.push({
            ...candidate,
            id: 'candidate_' + Date.now(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('votingSystem_candidates', JSON.stringify(candidates));
        return candidates[candidates.length - 1];
    }

    updateCandidate(id, updates) {
        const candidates = this.getCandidates();
        const index = candidates.findIndex(candidate => candidate.id === id);
        if (index !== -1) {
            candidates[index] = { ...candidates[index], ...updates };
            localStorage.setItem('votingSystem_candidates', JSON.stringify(candidates));
            return candidates[index];
        }
        return null;
    }

    deleteCandidate(id) {
        const candidates = this.getCandidates();
        const filtered = candidates.filter(candidate => candidate.id !== id);
        localStorage.setItem('votingSystem_candidates', JSON.stringify(filtered));
    }

    deleteCandidatesByElection(electionId) {
        const candidates = this.getCandidates();
        const filtered = candidates.filter(candidate => candidate.electionId !== electionId);
        localStorage.setItem('votingSystem_candidates', JSON.stringify(filtered));
    }

    // Vote operations
    getVotes() {
        return JSON.parse(localStorage.getItem('votingSystem_votes') || '[]');
    }

    getVotesByElection(electionId) {
        const votes = this.getVotes();
        return votes.filter(vote => vote.electionId === electionId);
    }

    hasVoted(userId, electionId) {
        const votes = this.getVotes();
        return votes.some(vote => vote.userId === userId && vote.electionId === electionId);
    }

    castVote(vote) {
        // Check if user has already voted
        if (this.hasVoted(vote.userId, vote.electionId)) {
            throw new Error('User has already voted in this election');
        }

        const votes = this.getVotes();
        votes.push({
            ...vote,
            id: 'vote_' + Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('votingSystem_votes', JSON.stringify(votes));
        return votes[votes.length - 1];
    }

    deleteVotesByElection(electionId) {
        const votes = this.getVotes();
        const filtered = votes.filter(vote => vote.electionId !== electionId);
        localStorage.setItem('votingSystem_votes', JSON.stringify(filtered));
    }

    getElectionResults(electionId) {
        const votes = this.getVotesByElection(electionId);
        const candidates = this.getCandidatesByElection(electionId);
        
        const results = candidates.map(candidate => {
            const voteCount = votes.filter(vote => vote.candidateId === candidate.id).length;
            return {
                candidate,
                votes: voteCount,
                percentage: votes.length > 0 ? ((voteCount / votes.length) * 100).toFixed(2) : 0
            };
        });

        // Sort by votes descending
        results.sort((a, b) => b.votes - a.votes);
        
        return {
            totalVotes: votes.length,
            results
        };
    }

    // Audit log operations
    getAuditLogs() {
        return JSON.parse(localStorage.getItem('votingSystem_auditLogs') || '[]');
    }

    addAuditLog(log) {
        const logs = this.getAuditLogs();
        logs.push({
            ...log,
            id: 'log_' + Date.now(),
            timestamp: new Date().toISOString(),
            ipAddress: 'localhost' // In production, would capture real IP
        });
        // Keep only last 1000 logs
        if (logs.length > 1000) {
            logs.shift();
        }
        localStorage.setItem('votingSystem_auditLogs', JSON.stringify(logs));
    }

    getRecentAuditLogs(limit = 50) {
        const logs = this.getAuditLogs();
        return logs.slice(-limit).reverse();
    }
}

// Export singleton instance
window.dataManager = new DataManager();