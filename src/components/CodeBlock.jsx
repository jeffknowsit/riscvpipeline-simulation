import React from 'react';

export default function CodeBlock({ visual }) {
    const lines = visual.code || [];
    const label = visual.label || '';

    const highlightLine = (line) => {
        // Simple RISC-V syntax highlighting
        return line.replace(
            /(lw|sw|add|sub|and|or|xor|sll|srl|beq|bne|jal|jalr|nop|addi|lui|lbu|sb)\b/g,
            '<span class="code-keyword">$1</span>'
        ).replace(
            /\b(x\d{1,2})\b/g,
            '<span class="code-register">$1</span>'
        ).replace(
            /(#.*)/g,
            '<span class="code-comment">$1</span>'
        );
    };

    return (
        <div className="code-block">
            {label && <span className="code-label">{label}</span>}
            {lines.map((line, i) => (
                <code
                    key={i}
                    className="code-line"
                    dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
                />
            ))}
        </div>
    );
}
