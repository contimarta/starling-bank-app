export const generateUID =() =>{

    const generateRandomSection = (length, possibleValues) =>{
        let result = "";
        for (let i = 0; i < length; i++) {
        result += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length));
        }
        return result;
    }

    const values = "0123456789abcd";
    const sections = [
      generateRandomSection(8, values),
      generateRandomSection(4, values),
      4+generateRandomSection(3, values),
      generateRandomSection(4, values),
      generateRandomSection(12, values)
    ];
    return sections.join("-");
  }
