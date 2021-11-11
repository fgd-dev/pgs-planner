import {
  Flex,
  FlexItem,
  Masthead,
  MastheadContent,
  Modal,
  ModalVariant,
  Page,
  PageSection,
  PageSectionVariants,
  Tab,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";
import React, { useState } from "react";
import {
  CommitteeSolutionResourceApi,
  Configuration,
  SolverOptions,
} from "./api";
import "./App.css";
import HistoryTable from "./History/HistoryTable";
import {
  DEFAULT_SETTINGS,
  NO_HISTORY,
  NO_PARTICIPANTS,
  UNDEFINED_SOLUTION,
} from "./Model/Defaults";
import { PersistenceData } from "./Model/PersistenceData";
import { Solution } from "./Model/Solution";
import ParticipantsTable from "./Participant/ParticipantsTable";
import { excelExport, excelImport } from "./Persistence/Excel";
import { ValidationResult } from "./Persistence/ExcelValidation";
import SolutionSettingsForm from "./Solution/SolutionSettingsForm";
import SolutionTable from "./Solution/SolutionTable";

function App() {
  const [isSolving, setIsSolving] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    header: "",
    message: "",
  });
  // State
  const [participants, setParticipants] = useState(NO_PARTICIPANTS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [committeeSolution, setCommitteeSolution] =
    useState(UNDEFINED_SOLUTION);
  const [history, setHistory] = useState(NO_HISTORY);

  // Tabs state
  const [activeTabKey, setActiveTabKey] = useState(0);
  const [solutionTabDisabled, setSolutionTabDisabled] = useState(true);
  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  // API configuration
  const apiConfig = new Configuration({
    basePath: window.location.origin,
  });
  const committeeSolutionResourceApi = new CommitteeSolutionResourceApi(
    apiConfig
  );

  // data import and export
  const dataExport = () => {
    excelExport(settings, participants, history, committeeSolution);
  };

  const onDataImport = (data: PersistenceData) => {
    setSettings(data.settings);
    setParticipants(data.participants);
    setHistory(data.history);
  };

  const onDataImportError = (result: ValidationResult) => {
    setErrorMessage({
      header: "Excel import error",
      message: result.getMessage(),
    });
    setIsErrorModalOpen(true);
  };

  const dataImport = (file: any) => {
    excelImport(file, onDataImport, onDataImportError);
  };

  const startSolving = () => {
    setIsSolving(true);
    const options = { settings, participants } as SolverOptions;
    committeeSolutionResourceApi
      .apiCommitteeSolutionSolvePost(options)
      .then((resp) => {
        const solutionId = resp.data.id ?? "ID_ERROR";
        const initializedSolution = UNDEFINED_SOLUTION;
        initializedSolution.id = solutionId;
        initializedSolution.solverStatus = "INITIALIZING";
        setCommitteeSolution(initializedSolution);
        setTimeout(() => {
          refreshSolution(solutionId);
        }, 2000);
      })
      .catch((error) => {
        setIsSolving(false);
        console.log(error);
        setErrorMessage({
          header: "Error while starting the solver",
          message: error.message,
        });
        setIsErrorModalOpen(true);
      });
  };

  const stopSolving = () => {
    committeeSolutionResourceApi
      .apiCommitteeSolutionStopSolvingIdGet(committeeSolution.id)
      .then(() => {
        setIsSolving(false);
      })
      .catch((error) => {
        setIsSolving(false);
        console.log(error);
        setErrorMessage({
          header: "Error while stopping the solver",
          message: error.message,
        });
        setIsErrorModalOpen(true);
      });
  };

  const refreshSolution = (id: string) => {
    setSolutionTabDisabled(false);
    setActiveTabKey(2);
    committeeSolutionResourceApi
      .apiCommitteeSolutionIdGet(id)
      .then((res) => {
        setCommitteeSolution(Solution.fromCommitteeSolution(res.data));
        if (res.data.solverStatus === "SOLVING_ACTIVE") {
          setTimeout(() => {
            refreshSolution(id);
          }, 2000);
        } else {
          setIsSolving(false);
        }
      })
      .catch((error) => {
        setIsSolving(false);
        console.log(error);
        setErrorMessage({
          header: "Error while refreshing the solution",
          message: error.message,
        });
        setIsErrorModalOpen(true);
      });
  };

  const handleErrorModalToggle = () => {
    setIsErrorModalOpen(!isErrorModalOpen);
  };

  return (
    <>
      <Page
        header={
          <Masthead
            id="stack-masthead"
            display={{ default: "inline", lg: "stack", "2xl": "inline" }}
          >
            <MastheadContent>
              <span>PGS PLANNER</span>
            </MastheadContent>
          </Masthead>
        }
      >
        <PageSection variant={PageSectionVariants.light}>
          <Flex direction={{ default: "column" }}>
            <FlexItem>
              <SolutionSettingsForm
                settings={settings}
                setSettings={setSettings}
                isSolving={isSolving}
                startSolving={startSolving}
                stopSolving={stopSolving}
                dataImport={dataImport}
                dataExport={dataExport}
                committeeSolution={committeeSolution}
              />
            </FlexItem>
            {participants.length > 0 ? (
              <FlexItem>
                <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                  <Tab
                    eventKey={0}
                    title={<TabTitleText>Participants</TabTitleText>}
                  >
                    <ParticipantsTable participants={participants} />
                  </Tab>
                  <Tab
                    eventKey={1}
                    title={<TabTitleText>History</TabTitleText>}
                  >
                    <HistoryTable history={history}></HistoryTable>
                  </Tab>
                  <Tab
                    eventKey={2}
                    title={<TabTitleText>Solution</TabTitleText>}
                    disabled={solutionTabDisabled}
                  >
                    <SolutionTable committees={committeeSolution.committees} />
                  </Tab>
                </Tabs>
              </FlexItem>
            ) : (
              <div>Please import a valid pgs-planner xlsx file.</div>
            )}
          </Flex>
        </PageSection>
      </Page>
      <Modal
        variant={ModalVariant.small}
        isOpen={isErrorModalOpen}
        aria-label="Modal warning example"
        title={errorMessage.header}
        titleIconVariant="danger"
        showClose={true}
        onClose={handleErrorModalToggle}
      >
        {errorMessage.message}
      </Modal>
    </>
  );
}

export default App;
