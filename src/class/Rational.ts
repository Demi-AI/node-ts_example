/**
 * 請參考 human.ts 的語法完成 Rational 類
 */

// Rational.ts
export class Rational {
    numerator: number;   // 分子
    denominator: number; // 分母

    // 構造函數
    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }

    // 返回分子的 getter 方法
    getNumerator(): number {
        return this.numerator;
    }

    // 返回分母的 getter 方法
    getDenominator(): number {
        return this.denominator;
    }

    // 正規化方法
    normalize(): Rational {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        const newNumerator = this.numerator / gcd;
        const newDenominator = this.denominator / gcd;

        return new Rational(newNumerator, newDenominator > 0 ? newDenominator : -newDenominator);
    }

    // 檢測是否為整數
    isWhole(): boolean {
        return this.denominator !== 0 && this.numerator % this.denominator === 0;
    }

    // 檢測是否有小數部分
    isDecimal(): boolean {
        return !this.isWhole();
    }

    // 比較兩個 Rational 物件或分子分母是否相等
    _equals(numerator: number, denominator: number): boolean {
        const normalizedThis = this.normalize();
        const rationalToCompare = new Rational(numerator, denominator).normalize();
        return normalizedThis.getNumerator() === rationalToCompare.getNumerator() &&
            normalizedThis.getDenominator() === rationalToCompare.getDenominator();
    }

    // 判斷是否相等（Rational 對象）
    equals(r: Rational): boolean {
        const normalizedThis = this.normalize();
        const normalizedR = r.normalize();
        return normalizedThis.getNumerator() === normalizedR.getNumerator() &&
            normalizedThis.getDenominator() === normalizedR.getDenominator();
    }

    // 靜態方法：將兩個字符陣列轉換為 Rational 物件
    static parseRational(chars1: string[], chars2: string[]): Rational {
        const numerator = parseInt(chars1.join(''), 10); // 連接分子字符並轉換為整數
        const denominator = parseInt(chars2.join(''), 10); // 連接分母字符並轉換為整數
        return new Rational(numerator, denominator);
    }

    // 靜態方法：從字符串轉換為 Rational 物件
    static _parseRational(str: string): Rational {
        const [numStr, denStr] = str.split('/');
        const numerator = parseInt(numStr, 10);
        const denominator = parseInt(denStr, 10);
        return new Rational(numerator, denominator);
    }

    // 將 Rational 物件轉換為字符串
    toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }

    // 計算最大公約數
    greatestCommonDivisor(a: number, b: number): number {
        return b === 0 ? Math.abs(a) : this.greatestCommonDivisor(b, a % b);
    }
}
