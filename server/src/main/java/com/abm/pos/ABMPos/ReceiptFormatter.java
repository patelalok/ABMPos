package com.abm.pos.ABMPos;

import java.util.ArrayList;
import java.util.List;

public class ReceiptFormatter {
    public static class TableColumnSettings {
        public String header;
        public int width;
        public TextAlign align;
        public TableColumnSettings (String h, int w, TextAlign a) {
            header = h;
            width = w;
            align = a;
        }
    }
    public static class Table {
        public TableColumnSettings[] columns;
        private String nStrikes (int n) {
            StringBuilder b = new StringBuilder(n);
            for (int i = 0; i < n; i++) b.append("-");
            return b.toString();
        }
        public Table(TableColumnSettings[] c) {
            columns = c;
            String[] headers = new String[columns.length];
            String[] separateLine = new String[columns.length];
            int colNum = 0;
            for (TableColumnSettings col : columns) {
                headers[colNum] = columns[colNum].header;
                separateLine[colNum] = nStrikes(columns[colNum].width);
                colNum++;
            }
            addRow(headers);
            addRow(separateLine);
        }
        public List<String[]> rows = new ArrayList<String[]>();
        public void addRow (String... data) {
            rows.add(data);
        }
    }

    private class DataBlock {
        /**
         * Offset left
         */
        public int width;
        public int offsetLeft = 0;
        public String content;
        public TextAlign align;

        public List<String> linedStrings;

        public DataBlock (int _offsetLeft, int _width, String _content, TextAlign _align) {
            offsetLeft = _offsetLeft;
            width = _width;
            content = _content;
            align = _align;

            linedStrings = splitIntoLines(content, width, align);
        }

        private String nSpaces (int n) {
            StringBuilder b = new StringBuilder(n);
            for (int i = 0; i < n; i++) b.append(" ");
            return b.toString();
        }

        public int getHeight () {
            return linedStrings.size();
        }

        public String getLine (int line) {
            if (line >= linedStrings.size())
                return nSpaces(width);
            else
                return linedStrings.get(line);
        }
    }

    private List<List<DataBlock>> receiptBlocks = new ArrayList<List<DataBlock>>();

    private int getDataBlockListHeight (List<DataBlock> list) {
        int i = 0;
        for (DataBlock b : list) {
            if (b.getHeight() > i)
                i = b.getHeight();
        }
        return i;
    }

    public enum TextAlign { LEFT, CENTER, RIGHT };

    public ReceiptFormatter(){}

    private String nSpaces (int n) {
        return repeatChar(' ', n);
    }

    private String repeatChar (char ch, int n) {
        StringBuilder b = new StringBuilder(n);
        for (int i = 0; i < n; i++) b.append(ch);
        return b.toString();
    }

    public String alignString (String s, int length, TextAlign align) {
        StringBuilder b = new StringBuilder(length);
        s = s.trim();
        if (s.length() > length)
            s = s.substring(0, length);
        switch (align) {
            case LEFT:
                b.append(s).append(nSpaces(length-s.length()));
                break;
            case RIGHT:
                b.append(nSpaces(length-s.length())).append(s);
                break;
            case CENTER:
                int spaces = length-s.length();
                int leftOffset = (int)Math.floor(spaces/2);
                b.append(nSpaces(leftOffset)).append(s).append(nSpaces(spaces-leftOffset));
                break;
        }
        return b.toString();
    }

    /**
     * Split given string s into lines by max_length characters in string
     * @param s
     * @param max_length
     * @return
     */
    public List<String> splitIntoLines (String s, int max_length, TextAlign align) {
        List<String> lines = new ArrayList<String>();
        lines.add("");
        //String[] pieces = s.split("[ \t\\x0B\f\r]+|(?=\n)");
        String[] pieces = s.split("[ \t\\x0B\f\r]+");

        int current_piece = 0;
        int current_line = 0;
        while (current_piece < pieces.length) {
            if (lines.get(current_line).length() + pieces[current_piece].length() > max_length) { // string is bigger than line
                if (lines.get(current_line).length() == 0) {
                    // real big not splittable word in new line
                    lines.set(current_line, pieces[current_piece].substring(0, max_length).trim());
                    pieces[current_piece] = pieces[current_piece].substring(max_length);
                }
                lines.add("");
                current_line++;
            } else {
                if (pieces[current_piece].length() != 0) {
                    if (pieces[current_piece].charAt(0) == '\n') {
                        if (lines.get(current_line).length() != 0) {
                            lines.add("");
                            current_line++;
                        }
                        pieces[current_piece] = pieces[current_piece].substring(1);
                    }
                    lines.set(current_line, lines.get(current_line) + pieces[current_piece].trim() + " ");
                    if (pieces[current_piece].length() != 0 && pieces[current_piece].charAt(pieces[current_piece].length()-1) == '\n') {
                        lines.add("");
                        current_line++;
                    }
                }
                current_piece++;
            }
        }
        for (int i = 0; i < lines.size(); i++) {
            lines.set(i, alignString(lines.get(i), max_length, align));
        }
        return lines;
    }

    public void add2Columns(String first, int fOffset, int fLength, TextAlign fAlign, String second, int sOffset, int sLength, TextAlign sAlign) {
        List<DataBlock> l = new ArrayList<DataBlock>();
        l.add(new DataBlock(fOffset, fLength, first, fAlign));
        l.add(new DataBlock(sOffset, sLength, second, sAlign));
        receiptBlocks.add(l);
    }

    public void add2Columns(String first, int fOffset, int fLength, String second, int sOffset, int sLength) {
        add2Columns(first, fOffset, fLength, TextAlign.LEFT, second, sOffset, sLength, TextAlign.LEFT);
    }

    public void add3ColumnsLastRight(String first, int fOffset, int fLength, String second, int sOffset, int sLength, String third, int tOffset, int tLength) {
        List<DataBlock> l = new ArrayList<DataBlock>();
        l.add(new DataBlock(fOffset, fLength, first, TextAlign.LEFT));
        l.add(new DataBlock(sOffset, sLength, second, TextAlign.LEFT));
        l.add(new DataBlock(tOffset, tLength, third, TextAlign.RIGHT));
        receiptBlocks.add(l);
    }

    public void printTable (Table table) {
        for (String[] row : table.rows) {
            DataBlock[] blocks = new DataBlock[table.columns.length];
            //DataBlock[] empty = new DataBlock[table.columns.length];
            int col = 0;
            for (String s : row) {
                blocks[col] = new DataBlock(1, table.columns[col].width, s, table.columns[col].align);
                //empty[col] = new DataBlock(1, table.columns[col].width, " ", TextAlign.LEFT);
                col++;
            }
            addColumns(blocks);
            //addColumns(empty);
        }
    }

    public void addColumns (DataBlock... blocks) {
        List<DataBlock> l = new ArrayList<DataBlock>();
        for (DataBlock b : blocks) {
            l.add(b);
        }
        receiptBlocks.add(l);
    }

    public void addLineBreak (int count) {
        List<DataBlock> l = new ArrayList<DataBlock>();
        for (int i = 0; i < count; i++) {
            l.add(new DataBlock(0, 1, "", TextAlign.LEFT));
            receiptBlocks.add(l);
        }
    }

    public void addLineStrike (int size) {
        List<DataBlock> l = new ArrayList<DataBlock>();
        l.add(new DataBlock(0, size, repeatChar('-', size), TextAlign.LEFT));
        receiptBlocks.add(l);
    }

    public void addLines(String s, int width, TextAlign align) {
        List<DataBlock> l = new ArrayList<DataBlock>();
        l.add(new DataBlock(0, width, s, align));
        receiptBlocks.add(l);
    }

    public List<String> createReceipt () {
        List<String> results = new ArrayList<String>();
        for (List<DataBlock> blocksInLine : receiptBlocks) {
            int blockHeight = getDataBlockListHeight(blocksInLine);
            int currentLine = 0;
            while (currentLine < blockHeight) {
                StringBuilder str = new StringBuilder();
                for (DataBlock b : blocksInLine) {
                    str.append(nSpaces(b.offsetLeft)).append(b.getLine(currentLine));
                }
                results.add(str.toString());
                currentLine++;
            }
        }
        return results;
    }
}