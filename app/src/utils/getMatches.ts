import IDecision from "../types/IDecision";
import IOptions from "../types/IOptions";

let userOptions: IOptions = {};
let uniqueUsers: Array<string> = [];

const addUser = (userId: string) => {
    if (!uniqueUsers.includes(userId)) {
        uniqueUsers.push(userId);
    }
};

const initilizeOptions = (optionId: string) => {
    userOptions[optionId] = {
        number: 0,
        isMatch: false,
    };
};

const addOption = (optionId: string) => {
    userOptions[optionId].number = userOptions[optionId].number + 1;
};

export function getMatches(decisions: Array<IDecision>) {
    userOptions = {};
    uniqueUsers = [];

    decisions.forEach((element: IDecision) => {
        addUser(element.user.id);
        initilizeOptions(element.option.title);
    });

    decisions.forEach((element: IDecision) => {
        addOption(element.option.title);
    });

    let totalMatches = 0;
    if (uniqueUsers.length > 1) {
        for (const key in userOptions) {
            if (userOptions[key].number == uniqueUsers.length) {
                totalMatches += 1;
                userOptions[key].isMatch = true;
            }
        }
    }
    return { totalMatches, userOptions };
}
