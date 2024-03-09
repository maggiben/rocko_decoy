import logger from "./logger";

const isOFACCompliant = async (address: string) => {
    const ofacUrl = "https://www.treasury.gov/ofac/downloads/sdnlist.txt";

    try {
        let response = await fetch(ofacUrl );

        if (!response.ok) {
            logger(`Failed to fetch OFAC list ${response}`, 'error');
            throw new Error('Failed to fetch OFAC list');
        }

        const ofacList = await response.text();
        
        return !ofacList.includes(address)

    } catch (error: any) {
        logger(error.message, 'error');
        return false;
    }
};

export default isOFACCompliant;
