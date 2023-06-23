export default function fetchQuestions(url) {

    const promise = new Promise(async (res, rej) => {
        try {
            const result = await fetch(`https://opentdb.com/api.php?${url}`);
            return result ? res(result.json()) : rej();
        } catch (error) {
            console.log(error);
            alert('Something went wrong. Please, try again later.');
        };
    });

    return promise;

}