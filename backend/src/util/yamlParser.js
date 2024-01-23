import fs from 'fs';
import YAML from 'yaml';

const YamlParser = (logger) => {
    return {
        parse(filePath) {
            try {
                const file = fs.readFileSync(filePath, 'utf8');
                const parsedFile = YAML.parse(file);
                return parsedFile;
            } catch (err) {
                logger.error(`Cannot parse yaml file: ${err}`);
                throw err;
            }
        },
    };
};

export default YamlParser;
