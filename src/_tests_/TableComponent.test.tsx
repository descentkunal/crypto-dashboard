import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from "../components/TableComponent";
import { BrowserRouter } from "react-router-dom";
import { CryptoCurrency } from "../types";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

const mockCryptos: CryptoCurrency[] = [
  {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "18674743.0000000000000000",
    maxSupply: "21000000.0000000000000000",
    marketCapUsd: "1077138620791.3968474796743423",
    volumeUsd24Hr: "22476552391.2820977558579998",
    priceUsd: "57676.4575070032310409",
    changePercent24Hr: "0.6163188530343451",
    vwap24Hr: "56385.2892484821165634",
    explorer: "https://blockchain.info/",
  },
];

describe("TableComponent", () => {
  test("renders TableComponent and checks for header", () => {
    renderWithRouter(
      <TableComponent
        cryptos={mockCryptos}
        loading={false}
        order="asc"
        orderBy="name"
        currentPage={1}
        itemsPerPage={10}
        handlePageChange={jest.fn()}
        showFavorites={true}
        highlightOnHover={true}
      />
    );

    // Check for the header text
    const headerElement = screen.getByText(
      /Today's Cryptocurrency Prices by Market Cap/i
    );
    expect(headerElement).toBeInTheDocument();
  });

  test("renders loading indicator when loading is true", () => {
    renderWithRouter(
      <TableComponent
        cryptos={mockCryptos}
        loading={true}
        order="asc"
        orderBy="name"
        currentPage={1}
        itemsPerPage={10}
        handlePageChange={jest.fn()}
        showFavorites={true}
        highlightOnHover={true}
      />
    );

    // Check for the loading indicator
    const loadingElement = screen.getByRole("progressbar");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders table rows correctly", () => {
    renderWithRouter(
      <TableComponent
        cryptos={mockCryptos}
        loading={false}
        order="asc"
        orderBy="name"
        currentPage={1}
        itemsPerPage={10}
        handlePageChange={jest.fn()}
        showFavorites={true}
        highlightOnHover={true}
      />
    );

    // Check for the symbol, name, price, and market cap in the table
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("57676.4575070032310409")).toBeInTheDocument();
    expect(
      screen.getByText("1077138620791.3968474796743423")
    ).toBeInTheDocument();
  });

  test("does not show pagination when itemsPerPage is 1", () => {
    renderWithRouter(
      <TableComponent
        cryptos={mockCryptos}
        loading={false}
        order="asc"
        orderBy="name"
        currentPage={1}
        itemsPerPage={1}
        handlePageChange={jest.fn()}
        showFavorites={true}
        highlightOnHover={true}
      />
    );

    // Check that the pagination component is not rendered
    const paginationElement = screen.queryByRole("navigation");
    expect(paginationElement).not.toBeInTheDocument();
  });

  test("does not highlight name on hover when highlightOnHover is false", () => {
    renderWithRouter(
      <TableComponent
        cryptos={mockCryptos}
        loading={false}
        order="asc"
        orderBy="name"
        currentPage={1}
        itemsPerPage={10}
        handlePageChange={jest.fn()}
        showFavorites={true}
        highlightOnHover={false}
      />
    );

    // Check that the name cell does not have the hover class
    const nameCell = screen.getByText("Bitcoin");
    expect(nameCell).not.toHaveClass("table-page__table-cell--hoverable");
  });
});
