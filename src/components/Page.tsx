import { PropsWithChildren } from "react";
import classNames from "../utils/tailwind";

const enableColouredBackground = false;

interface PageContainerProps extends PropsWithChildren {
  pageLeftBar?: React.ReactNode;
  pageRightBar?: React.ReactNode;
  pageTopBar?: React.ReactNode;
  pageBottomBar?: React.ReactNode;
  pageRightBarDisabled?: boolean;
  path: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  pageBottomBar,
  pageLeftBar,
  pageTopBar,
}) => {
  return (
    <main className="flex" style={{ minHeight: "100vh" }}>
      <div
        className={`hidden w-[calc((100vw-2000px)/2)] min-[2000px]:block`}
      ></div>
      <div
        style={{ backgroundColor: "#f6f3ec" }}
        className={classNames(
          "mx-auto flex max-w-[2000px] flex-grow justify-center"
        )}
      >
        {/* //note that conditional rendering causes pop in */}
        <PageLeftBar component={pageLeftBar} />
        <div
          className={classNames(
            "w-full ",
            enableColouredBackground ? "bg-blue-200/40" : ""
          )}
          style={{ minHeight: "100dvh" }}
        >
          <PageTopBar component={pageTopBar} />
          <div className="px-4 py-4 pb-16">{children}</div>
          <PageBottomBar component={pageBottomBar} />
        </div>
      </div>
      <div
        className={`hidden w-[calc((100vw-2000px)/2)] min-[2000px]:block`}
      ></div>
    </main>
  );
};

interface BarProps {
  component?: React.ReactNode;
}

const PageLeftBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "w-18 sticky top-0 hidden h-[100dvh] sm:block ",
        enableColouredBackground ? "bg-red-200/40" : ""
      )}
    >
      {component ?? (
        <div className="flex h-full flex-col justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

const PageTopBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "sticky top-0 z-40 w-full",
        enableColouredBackground ? "bg-purple-400/40" : ""
      )}
    >
      {component ?? (
        <div className="flex w-full justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

const PageBottomBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "fixed bottom-0 z-40 w-full sm:hidden",
        enableColouredBackground ? "bg-red-400/40" : ""
      )}
    >
      {component ?? (
        <div className="flex w-full justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

interface DefaultPageContainerProps extends PropsWithChildren {
  path: string;
}

export const DefaultPageContainer: React.FC<DefaultPageContainerProps> = ({
  children,
  path,
}) => {
  return (
    <main style={{ minHeight: "100vh" }}>
      <div
        className={classNames(
          "mx-auto flex max-w-[2000px] flex-grow justify-center"
        )}
      >
        {children}
      </div>
    </main>
  );
};
