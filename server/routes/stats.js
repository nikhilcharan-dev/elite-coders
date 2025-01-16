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
    
    const apiData = [];
    if(GQLvariables.username !== "") apiData.push(axios.post(process.env.LC_API, { query: GQLQuery, variables: GQLvariables }, { headers: { 'Content-Type': 'application/json', Accept: 'application/json'} }));
    if(ccusername !== "") apiData.push(axios.get(`https://codechef-api.vercel.app/handle/${ccusername}`));
    if(cfusername !== "") apiData.push(axios.get(`https://codeforces.com/api/user.info?handles=${cfusername}`));

    try {
        const [lcData, ccData, cfData] = await Promise.all([
            axios.get(`https://codechef-api.vercel.app/handle/${ccusername}`),
            axios.get(`https://codeforces.com/api/user.info?handles=${cfusername}`)
        ]);
        console.log(lcData.data, ccData.data, cfData.data);
        return res.status(200).json({ "lcData": lcData.data, "ccData": ccData.data, "cfData": cfData.data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }

});



export default router;