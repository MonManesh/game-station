<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">

        <div id="sudoku">
            <table>
                <xsl:apply-templates/>
            </table>

        </div>
    </xsl:template>
    <xsl:template match="row">

        <tr>
            <xsl:apply-templates/>
        </tr>
    </xsl:template>
    <xsl:template match="cell">

        <td>
            <xsl:value-of select="."/>

        </td>

    </xsl:template>


</xsl:stylesheet>





