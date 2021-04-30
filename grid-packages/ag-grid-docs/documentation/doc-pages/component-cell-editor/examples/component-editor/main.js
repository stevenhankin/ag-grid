var columnDefs = [
    {
        headerName: "Doubling",
        field: "number",
        cellEditor: "doublingEditor",
        editable: true,
        width: 300
    },
    {
        field: "mood",
        cellRenderer: "moodRenderer",
        cellEditor: "moodEditor",
        editable: true,
        width: 300
    },
    {
        headerName: "Numeric",
        field: "number",
        cellEditor: "numericEditor",
        editable: true,
        width: 280
    }
];

// inScope[createRowData]
function createRowData() {
    return [
        {name: "Bob", mood: "Happy", number: 10},
        {name: "Harry", mood: "Sad", number: 3},
        {name: "Sally", mood: "Happy", number: 20},
        {name: "Mary", mood: "Sad", number: 5},
        {name: "John", mood: "Happy", number: 15},
        {name: "Jack", mood: "Happy", number: 25},
        {name: "Sue", mood: "Sad", number: 43},
        {name: "Sean", mood: "Sad", number: 1335},
        {name: "Niall", mood: "Happy", number: 2},
        {name: "Alberto", mood: "Happy", number: 123},
        {name: "Fred", mood: "Sad", number: 532},
        {name: "Jenny", mood: "Happy", number: 34},
        {name: "Larry", mood: "Happy", number: 13},
    ];
}


var gridOptions = {
    columnDefs: columnDefs,
    rowData: this.createRowData(),
    components: {
        doublingEditor: DoublingEditor,
        moodRenderer: MoodRenderer,
        moodEditor: MoodEditor,
        numericEditor: NumericEditor
    },
    defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    // gridOptions.api.sizeColumnsToFit();
});