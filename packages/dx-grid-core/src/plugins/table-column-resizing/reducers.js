const MIN_SIZE = 40;

export const changeTableColumnWidth = (state, { columnName, shift }) => {
  const { columnWidths } = state;
  const nextColumnWidth = columnWidths.slice();
  const index = nextColumnWidth.findIndex(elem => elem.columnName === columnName);
  const updatedColumn = nextColumnWidth[index];
  const size = Math.max(MIN_SIZE, updatedColumn.width + shift);
  nextColumnWidth.splice(index, 1, { columnName, width: size });

  return {
    columnWidths: nextColumnWidth,
  };
};

export const draftTableColumnWidth = (state, { columnName, shift }) => {
  const { columnWidths } = state;
  const updatedColumn = columnWidths.find(elem => elem.columnName === columnName);
  const size = Math.max(MIN_SIZE, updatedColumn.width + shift);

  return {
    draftColumnWidths: [{ columnName: updatedColumn.columnName, width: size }],
  };
};

export const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: [],
});
