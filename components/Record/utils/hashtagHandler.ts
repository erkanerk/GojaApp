const hashtagHandler = (hashtags: string) => {
    const hashtagArray = hashtags.split(/(?=#)/g);
    console.log(hashtags);
    const noDuplicates = [...new Set(hashtagArray)];
    const hashtagNoEmptyStrings = noDuplicates.filter((hashtag) => {
        if (hashtag === ' ' || hashtag === '') {
            return false;
        }
        return true;
    });
    return hashtagNoEmptyStrings;
};
export { hashtagHandler };
