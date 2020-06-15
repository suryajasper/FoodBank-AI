#include "information.h"
#include "ui_information.h"
#include <QtDebug>

Information::Information(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::Information)
{
    ui->setupUi(this);

    QObject::connect(ui->View, SIGNAL(clicked()),this, SLOT(clickedSlot()));
    QObject::connect(ui->next, SIGNAL(clicked()),this, SLOT(next()));
}

Information::~Information()
{
    delete ui;
}

void Information::clickedSlot() {

    int h = ((ui->h1->value() * 12) + (ui->h2->value())) * 2.54;
    double w = ui->weight->text().toInt() / 2.2;
    bool g;
    if (ui->comboBox->currentText().compare("M") == 0) {
        g = true;
    }
    else {
        g = false;
    }
    int c = calculateCalories(g, h, ui->age->text().toInt(), w);
    ui->calories->setText(QString::number(c));
}

//Miflin St. Jeor Equation
int Information::calculateCalories(bool gender, int height, int age, double weight) {
    int c;
    if (gender) {
        c = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    else {
        c = (10 * weight) + (6.25 * height) - (5 * age) - 101;
    }

    qDebug() << height << age << weight << c;
    return (c);
}

void Information::next() {
    ui->stackedWidget->setCurrentIndex(1);
}
