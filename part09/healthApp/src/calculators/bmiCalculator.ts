export interface PhysicalMetrics {
  height: number;
  weight: number;
}

export const parsePhysicalMetrics = (args: string[]): PhysicalMetrics => {
  if (args.length < 4) {
    throw new Error("Insufficient arguments provided");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments provided");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values must be valid numbers");
  }

  return { height, weight };
};

enum BmiClassification {
  SevereThinness = "Underweight (severe thinness)",
  ModerateThinness = "Underweight (moderate thinness)",
  MildThinness = "Underweight (mild thinness)",
  Normal = "Normal (healthy weight)",
  Overweight = "Overweight",
  ObeseClass1 = "Obese Class I (Moderate)",
  ObeseClass2 = "Obese Class II (Severe)",
  ObeseClass3 = "Obese Class III (Very severe)",
}

const calculateBmiValue = (height: number, weight: number): number => {
  return weight / Math.pow(height / 100, 2);
};

const classifyBmi = (bmi: number): BmiClassification => {
  if (bmi < 16) return BmiClassification.SevereThinness;
  if (bmi < 17) return BmiClassification.ModerateThinness;
  if (bmi < 18.5) return BmiClassification.MildThinness;
  if (bmi < 25) return BmiClassification.Normal;
  if (bmi < 30) return BmiClassification.Overweight;
  if (bmi < 35) return BmiClassification.ObeseClass1;
  if (bmi < 40) return BmiClassification.ObeseClass2;
  return BmiClassification.ObeseClass3;
};

export const calculateBmi = (
  height: number,
  weight: number,
): BmiClassification => {
  const bmi = calculateBmiValue(height, weight);
  return classifyBmi(bmi);
};
