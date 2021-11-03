import { Person, Settings } from "src/api";
import { PersistenceData } from "src/Model/PersistenceData";
import { Solution } from "src/Model/Solution";
import XLSX from "xlsx";
import { parseExcelData } from "./ExcelDataParser";
import {
  Constants,
  participantsColumns,
  ValidationResult,
  Validators,
} from "./ExcelValidation";

export function excelImport(
  file: any,
  callback: (data: PersistenceData) => void,
  error: (validationResult: ValidationResult) => void
) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const ab = e?.target?.result;
    const workbook = XLSX.read(ab, { type: "binary" });
    const sheetsValidationError = Validators.validateSheetsNames(
      workbook.SheetNames
    );
    if (sheetsValidationError.hasError()) {
      error(sheetsValidationError);
    }
    callback(parseExcelData(workbook));
  };

  reader.readAsBinaryString(file);
}

export function excelExport(
  settings: Settings,
  persons: Array<Person>,
  committeeSolution: Solution
) {
  // Settings sheet
  const settingsData = [
    [Constants.SETTING_NUMBER_OF_PRO, settings.nbProParticipants],
    [Constants.SETTING_NUMBER_OF_NON_PRO, settings.nbNonProParticipants],
    [
      Constants.SETTING_MAX_NUMBER_OF_ASSIGNMENTS,
      settings.maximumNumberOfAssignments,
    ],
  ];
  const settingsWorksheet = XLSX.utils.aoa_to_sheet(settingsData);

  const sanitizeString = (s?: string) => {
    return s ?? "";
  };

  const sanitizeNamedArray = (a?: Array<any>): string => {
    if (a === undefined) {
      return "";
    } else {
      return a.map((i: any) => i.name).join(",");
    }
  };

  // Participants sheet
  const participantsData = [participantsColumns];
  persons.forEach((p: Person) =>
    participantsData.push([
      sanitizeString(p.name),
      sanitizeString(p.personType?.name),
      sanitizeString(p.location?.name),
      sanitizeNamedArray(p.skills),
      sanitizeNamedArray(p.languages),
      sanitizeNamedArray(p.availability),
      sanitizeNamedArray(p.skillsToCertificate),
    ])
  );
  const participantsWorksheet = XLSX.utils.aoa_to_sheet(participantsData);

  // Solutions sheet
  const solutionsData = [
    ["Solution", new Date()],
    ["Evaluated Person", "Timeslot", "Assignments"],
  ];
  Object.values(committeeSolution.committees.committees).forEach((c: any) => {
    const rowData = [c.evaluatedPerson.name];
    if (c.assignments.length) {
      rowData.push(c.assignments[0]?.timeSlot?.name);
      c.assignments.forEach((a: any) => rowData.push(a.assignedPerson.name));
    }
    solutionsData.push(rowData);
  });
  const solutionsWorksheet = XLSX.utils.aoa_to_sheet(solutionsData);

  // Saving the workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, settingsWorksheet, Constants.SETTINGS);
  XLSX.utils.book_append_sheet(
    workbook,
    participantsWorksheet,
    Constants.PARTICIPANTS
  );
  XLSX.utils.book_append_sheet(
    workbook,
    solutionsWorksheet,
    Constants.SOLUTIONS
  );
  XLSX.writeFile(workbook, "pgs-planner-export.xlsx");
}
