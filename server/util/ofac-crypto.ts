const isOFACCompliant = async (address: string) => {
    const ofacUrl = "https://www.treasury.gov/ofac/downloads/sdnlist.txt";

    try {
        let response = await fetch(ofacUrl );

        if (!response.ok) {
            throw new Error('Failed to fetch OFAC list');
        }

        const ofacList = await response.text();
        console.log(!ofacList.includes(address));
        
        return !ofacList.includes(address)

    } catch (error: any) {
        console.log('Error:', error.message);
        return false;
    }
};

export default isOFACCompliant;
