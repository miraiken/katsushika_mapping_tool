class DataAnalyzer {
    max(a, b, comp = (l, r) => l < r) {
        return comp(a, b) ? b : a;
    }

    min(a, b, comp = (l, r) => l < r) {
        return comp(a, b) ? a : b;
    }

    maxElements(src, comp = (l, r) => l < r) {
        let re = [];
        let maxElem = src[0];

        for(let i = 0; i< src.length; ++i) {
            if(comp(maxElem, src[i])) {
                re = [];
                maxElem = src[i];
                re.push({"index": i, "value": src[i]});
            } else if(!comp(src[i], maxElem)) {
                re.push({"index": i, "value": src[i]});
            }
        }
        return re;
    }

    minElements(src, comp = (l, r) => l < r) {
        return this.maxElements(src, (l, r) => comp(r, l));
    }

    maxElement(src, comp = (l, r) => l < r) {
        let re = {"index": 0, "value": src[0]};
        for(let i = 0; i< src.length; ++i) {
            if(comp(re.value, src[i])) {
                re = {"index": i, "value": src[i]};
            }
        }
        return re;
    }

    minElement(src, comp = (l, r) => l < r) {
        return this.maxElement(src, (l, r) => comp(r, l));
    }

    /**
     * convert number array to parcentage array
     * @param {number[]} src source number array
     * @param {number|null} borderMin border number wether it's same as 0% or not.
     * @param {number|null} borderMax border number wether it's same as 100% or not.
     */
    convertToPercentage(src, borderMin = null, borderMax = null) {
        const maxElem = (null == borderMax)
            ? this.max(borderMax, this.maxElement(src).value)
            : this.maxElement(src).value;
        const minElem = (null == borderMax)
            ? this.min(borderMax, this.minElement(src).value)
            : this.minElement(src).value;
        const distance = maxElem - minElem;

        const re = [];
        for(const e of src) {
            re.push(((e - minElem) / distance) * 100);
        }
        return re;
    }
}

module.exports = new DataAnalyzer();
