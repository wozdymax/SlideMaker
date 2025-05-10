import styles from "./App.module.css";
import { HistoryType } from "./utils/history";
import { HistoryContext } from "./views/hooks/historyContext";
import { SlidesList } from "./views/slidesList/SlidesList";
import { TopPanel } from "./views/topPanel/TopPanel";
import { Workspace } from "./views/workspace/Workspace";

type AppProps = {
    history: HistoryType;
};
const App = ({ history }: AppProps) => {
    return (
        <HistoryContext.Provider value={history}>
            <TopPanel />
            <div className={styles.container}>
                <SlidesList />
                <Workspace />
            </div>
        </HistoryContext.Provider>
    );
};

export default App;
