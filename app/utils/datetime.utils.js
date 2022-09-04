exports.getCurrentEpochInSecs = () => {
    return Math.round(new Date().getTime() / 1000);
};
