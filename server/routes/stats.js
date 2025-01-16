import express from 'express';
import axios from 'axios';

const router = express.Router();

const GQLQuery = `
    query userCombinedInfo($username: String!, $year: Int!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        contestBadge {
        name
        expired
        hoverText
        icon
        }
        badges {
            id
            name
            displayName
            icon
        }
        upcomingBadges {
            name
            icon
            progress
        }
        username
        profile {
            ranking
            userAvatar
            realName
            aboutMe
            school
            skillTags
            reputation
            reputationDiff
            certificationLevel
        }
        userCalendar(year: $year) {
            activeYears
            streak
            totalActiveDays
        }
        submitStats {
            acSubmissionNum {
                difficulty
                count
                submissions
            }
            totalSubmissionNum {
                difficulty
                count
                submissions
            }
        }
    }
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
        name
        }
    }
}
`;

router.put('/', async (req, res) => {
    const GQLvariables = {
        username: req.body.lcusername,
        year: req.body.year,
    }

    const { ccusername, cfusername } = req.body;

    try {
        let lcData = null;
        let ccData = null;
        let cfData = null;

        if (GQLvariables.username) {
            lcData = await axios.post(process.env.LC_API, { query: GQLQuery, variables: GQLvariables }, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }).then(res => res.data);
        }
        if (ccusername) {
            ccData = await axios.get(`https://codechef-api.vercel.app/handle/${ccusername}`);
        }
        if (cfusername) {
            cfData = await axios.get(`https://codeforces.com/api/user.info?handles=${cfusername}`);
        }

        return res.status(200).json({ "leetcode": lcData.data, "codechef": ccData.data, "codeforces": cfData.data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }

});



export default router;