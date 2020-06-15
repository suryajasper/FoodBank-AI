/********************************************************************************
** Form generated from reading UI file 'information.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_INFORMATION_H
#define UI_INFORMATION_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QScrollArea>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Information
{
public:
    QWidget *centralwidget;
    QStackedWidget *stackedWidget;
    QWidget *page;
    QLabel *label;
    QLabel *label_2;
    QLabel *label_3;
    QLabel *label_4;
    QLabel *label_5;
    QComboBox *comboBox;
    QLineEdit *age;
    QLineEdit *weight;
    QSpinBox *h1;
    QSpinBox *h2;
    QLabel *label_6;
    QLabel *calories;
    QPushButton *View;
    QPushButton *next;
    QWidget *page_2;
    QProgressBar *progressBar;
    QLabel *label_7;
    QScrollArea *scrollArea;
    QWidget *scrollAreaWidgetContents;
    QWidget *verticalLayoutWidget;
    QVBoxLayout *verticalLayout;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *Information)
    {
        if (Information->objectName().isEmpty())
            Information->setObjectName(QStringLiteral("Information"));
        Information->resize(800, 600);
        centralwidget = new QWidget(Information);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        stackedWidget = new QStackedWidget(centralwidget);
        stackedWidget->setObjectName(QStringLiteral("stackedWidget"));
        stackedWidget->setGeometry(QRect(10, 20, 771, 541));
        page = new QWidget();
        page->setObjectName(QStringLiteral("page"));
        label = new QLabel(page);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(30, 20, 691, 31));
        QFont font;
        font.setPointSize(20);
        label->setFont(font);
        label_2 = new QLabel(page);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(360, 70, 51, 31));
        QFont font1;
        font1.setPointSize(16);
        label_2->setFont(font1);
        label_2->setAlignment(Qt::AlignCenter);
        label_3 = new QLabel(page);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setGeometry(QRect(360, 140, 61, 31));
        label_3->setFont(font1);
        label_3->setAlignment(Qt::AlignCenter);
        label_4 = new QLabel(page);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setGeometry(QRect(310, 230, 151, 31));
        label_4->setFont(font1);
        label_4->setAlignment(Qt::AlignCenter);
        label_5 = new QLabel(page);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setGeometry(QRect(340, 320, 91, 31));
        label_5->setFont(font1);
        label_5->setAlignment(Qt::AlignCenter);
        comboBox = new QComboBox(page);
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->setObjectName(QStringLiteral("comboBox"));
        comboBox->setGeometry(QRect(370, 360, 41, 22));
        comboBox->setEditable(false);
        age = new QLineEdit(page);
        age->setObjectName(QStringLiteral("age"));
        age->setGeometry(QRect(360, 100, 51, 20));
        weight = new QLineEdit(page);
        weight->setObjectName(QStringLiteral("weight"));
        weight->setGeometry(QRect(350, 260, 81, 20));
        h1 = new QSpinBox(page);
        h1->setObjectName(QStringLiteral("h1"));
        h1->setGeometry(QRect(340, 170, 42, 22));
        h2 = new QSpinBox(page);
        h2->setObjectName(QStringLiteral("h2"));
        h2->setGeometry(QRect(400, 170, 42, 22));
        label_6 = new QLabel(page);
        label_6->setObjectName(QStringLiteral("label_6"));
        label_6->setGeometry(QRect(380, 440, 91, 21));
        QPalette palette;
        QBrush brush(QColor(85, 170, 0, 255));
        brush.setStyle(Qt::SolidPattern);
        palette.setBrush(QPalette::Active, QPalette::ToolTipBase, brush);
        palette.setBrush(QPalette::Inactive, QPalette::ToolTipBase, brush);
        palette.setBrush(QPalette::Disabled, QPalette::ToolTipBase, brush);
        label_6->setPalette(palette);
        QFont font2;
        font2.setPointSize(18);
        label_6->setFont(font2);
        calories = new QLabel(page);
        calories->setObjectName(QStringLiteral("calories"));
        calories->setGeometry(QRect(260, 440, 111, 21));
        calories->setFont(font2);
        calories->setAlignment(Qt::AlignRight|Qt::AlignTrailing|Qt::AlignVCenter);
        View = new QPushButton(page);
        View->setObjectName(QStringLiteral("View"));
        View->setGeometry(QRect(360, 470, 75, 23));
        next = new QPushButton(page);
        next->setObjectName(QStringLiteral("next"));
        next->setGeometry(QRect(680, 500, 75, 23));
        stackedWidget->addWidget(page);
        page_2 = new QWidget();
        page_2->setObjectName(QStringLiteral("page_2"));
        progressBar = new QProgressBar(page_2);
        progressBar->setObjectName(QStringLiteral("progressBar"));
        progressBar->setGeometry(QRect(140, 80, 561, 23));
        progressBar->setValue(24);
        label_7 = new QLabel(page_2);
        label_7->setObjectName(QStringLiteral("label_7"));
        label_7->setGeometry(QRect(230, 20, 381, 41));
        QFont font3;
        font3.setPointSize(22);
        label_7->setFont(font3);
        label_7->setAlignment(Qt::AlignCenter);
        scrollArea = new QScrollArea(page_2);
        scrollArea->setObjectName(QStringLiteral("scrollArea"));
        scrollArea->setGeometry(QRect(190, 130, 471, 381));
        scrollArea->setWidgetResizable(true);
        scrollAreaWidgetContents = new QWidget();
        scrollAreaWidgetContents->setObjectName(QStringLiteral("scrollAreaWidgetContents"));
        scrollAreaWidgetContents->setGeometry(QRect(0, 0, 469, 379));
        verticalLayoutWidget = new QWidget(scrollAreaWidgetContents);
        verticalLayoutWidget->setObjectName(QStringLiteral("verticalLayoutWidget"));
        verticalLayoutWidget->setGeometry(QRect(10, 10, 451, 351));
        verticalLayout = new QVBoxLayout(verticalLayoutWidget);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setContentsMargins(0, 0, 0, 0);
        scrollArea->setWidget(scrollAreaWidgetContents);
        stackedWidget->addWidget(page_2);
        Information->setCentralWidget(centralwidget);
        menubar = new QMenuBar(Information);
        menubar->setObjectName(QStringLiteral("menubar"));
        menubar->setGeometry(QRect(0, 0, 800, 22));
        Information->setMenuBar(menubar);
        statusbar = new QStatusBar(Information);
        statusbar->setObjectName(QStringLiteral("statusbar"));
        Information->setStatusBar(statusbar);

        retranslateUi(Information);

        stackedWidget->setCurrentIndex(0);


        QMetaObject::connectSlotsByName(Information);
    } // setupUi

    void retranslateUi(QMainWindow *Information)
    {
        Information->setWindowTitle(QApplication::translate("Information", "MainWindow", nullptr));
        label->setText(QApplication::translate("Information", "Enter your Information to Help us Calculate Your Calories", nullptr));
        label_2->setText(QApplication::translate("Information", "Age", nullptr));
        label_3->setText(QApplication::translate("Information", "Height", nullptr));
        label_4->setText(QApplication::translate("Information", "Weight", nullptr));
        label_5->setText(QApplication::translate("Information", "Gender", nullptr));
        comboBox->setItemText(0, QApplication::translate("Information", "M", nullptr));
        comboBox->setItemText(1, QApplication::translate("Information", "F", nullptr));

        label_6->setText(QApplication::translate("Information", "Calories", nullptr));
        calories->setText(QApplication::translate("Information", "354", nullptr));
        View->setText(QApplication::translate("Information", "View", nullptr));
        next->setText(QApplication::translate("Information", "Next ->", nullptr));
        label_7->setText(QApplication::translate("Information", "% Daily calories compete", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Information: public Ui_Information {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_INFORMATION_H
